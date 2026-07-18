import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

export interface ContactEmailProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  interest?: string;
  message?: string;
}

export const ContactEmail = ({
  firstname,
  lastname,
  email,
  phone,
  city,
  interest,
  message,
}: ContactEmailProps) => (
  <Html lang="es">
    <Head />
    <Preview>
      Nuevo mensaje de {firstname} {lastname}
    </Preview>
    <Body style={s.body}>
      <Container style={s.container}>
        <Section style={s.header}>
          <Heading style={s.heading}>Nuevo mensaje de contacto</Heading>
        </Section>

        <Section style={s.content}>
          <Field label="Nombre" value={`${firstname} ${lastname}`} />
          <Field label="Correo electrónico" value={email} />
          <Field label="Teléfono" value={phone} />
          <Field label="Ciudad" value={city} />
          {interest && <Field label="Interesado en" value={interest} />}
          {message && <Field label="Comentarios" value={message} />}
        </Section>

        <Hr style={s.divider} />

        <Section>
          <Text style={s.footer}>Este correo fue generado automáticamente.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: "16px" }}>
    <Text style={s.label}>{label}</Text>
    <Text style={s.value}>{value}</Text>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "0 0 24px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#09090b",
    padding: "28px 32px",
  },
  heading: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  content: {
    padding: "28px 32px 8px",
  },
  divider: {
    borderColor: "#e4e4e7",
    margin: "4px 32px 16px",
  },
  footer: {
    color: "#a1a1aa",
    fontSize: "12px",
    margin: "0 32px",
  },
  label: {
    color: "#71717a",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.06em",
    margin: "0 0 2px",
    textTransform: "uppercase",
  },
  value: {
    color: "#18181b",
    fontSize: "15px",
    margin: 0,
  },
};
