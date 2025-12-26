import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { FormConfig } from "@/app/common/utils/helper-hubspot";

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  shouldRedirect: boolean;
}

const useHubspotForm = (formConfig: FormConfig) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    shouldRedirect: false,
  });

  const methods = useForm();
  const formName = formConfig.id.toUpperCase();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isValid = formConfig.fields?.length > 0 && formConfig.schema;
    console.log(
      `${isValid ? "🟢" : "🔴"} [${formName}] ${isValid ? "Listo para enviar" : "Error en configuración"}`
    );
  }, [formName, formConfig]);

  const updateState = (state: Partial<SubmissionState>) => {
    setSubmissionState((prev) => ({ ...prev, ...state }));
  };

  const launchToSpace = async (data: z.infer<typeof formConfig.schema>) => {
    if (typeof window === "undefined") {
      console.log("⚠️ Intento de envío durante SSR - abortando");
      return;
    }

    updateState({ isSubmitting: true, isSuccess: false, isError: false });

    let payload: Record<string, unknown> | null = null;

    try {
      const validatedData = formConfig.schema.parse(data);
      console.log(`✅ [${formName}] Datos validados correctamente`);

      payload = {
        ...(validatedData as Record<string, unknown>),
        _formId: formConfig.id,
      };
      console.log(`🚀 [${formName}] Enviando formulario...`, payload);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/hubspot/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(`📡 [${formName}] Respuesta:`, {
        status: response.status,
        ok: response.ok,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`🎉 [${formName}] Misión exitosa`);

        updateState({
          isSubmitting: false,
          isSuccess: true,
          shouldRedirect: true,
        });

        methods.reset();
        return { success: true, data: result };
      }

      const errorData = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));

      console.error(`💥 [${formName}] Error - Status: ${response.status}`, {
        errorData,
        payload,
      });
      throw new Error(errorData.error || `Error ${response.status}`);
    } catch (error) {
      let errorMessage = "Error desconocido";

      if (error instanceof z.ZodError) {
        errorMessage = `Errores de validación: ${error.issues.map((e) => e.message).join(", ")}`;
        console.log(`💥 [${formName}] Error de validación:`, data);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.log(`💥 [${formName}] Error:`, error.message);
      }

      updateState({
        isSubmitting: false,
        isError: true,
        errorMessage,
      });

      // Devuelve el payload junto al error para poder inspeccionarlo en local
      return { success: false, error: errorMessage, payload };
    }
  };

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (typeof window !== "undefined") {
      methods.handleSubmit(launchToSpace)(e);
    }
  };

  return {
    register: methods.register,
    handleSubmit: handleFormSubmit,
    formState: methods.formState,
    submissionState,
    fields: formConfig.fields,
    formId: formConfig.id,
    resetForm: methods.reset,

    submitData: launchToSpace,
  };
};

export default useHubspotForm;
