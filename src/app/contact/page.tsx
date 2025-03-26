import ContactForm from "./_components/contact-form";

export default function Contact() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full space-y-2 py-8 text-center">
        <h1 className="text-3xl font-light">Get in touch!</h1>
        <p className="text-sm font-light">We&apos;d love to hear from you!</p>
      </div>

      <div className="flex flex-col items-center">
        <ContactForm />
      </div>
    </main>
  );
}
