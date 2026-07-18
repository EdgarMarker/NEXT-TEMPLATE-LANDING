"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export interface ResendContactData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  message?: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

export const useResendForm = () => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const methods = useForm<ResendContactData>();

  const updateState = (state: Partial<SubmissionState>) =>
    setSubmissionState((prev) => ({ ...prev, ...state }));

  const onSubmit = async (data: ResendContactData) => {
    updateState({ isSubmitting: true, isSuccess: false, isError: false });

    try {
      const response = await fetch("/api/resend/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(err.error || `Error ${response.status}`);
      }

      updateState({ isSubmitting: false, isSuccess: true });
      methods.reset();
    } catch (error) {
      updateState({
        isSubmitting: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  return {
    register: methods.register,
    handleSubmit: methods.handleSubmit(onSubmit),
    formState: methods.formState,
    submissionState,
    resetForm: methods.reset,
  };
};
