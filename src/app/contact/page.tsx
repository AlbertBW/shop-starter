import ContactForm from "./_components/contact-form";
import { siteConfig } from "~/config/site";

export default function Contact() {
  return (
    <main className="flex w-full flex-col items-center justify-center py-12">
      <section className="relative mb-16 w-full text-center">
        <h1 className="mb-4 text-4xl font-light">Get in touch</h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-primary" />
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We&apos;d love to hear from you and learn how we can help.
        </p>
      </section>

      <div className="mb-16 flex w-full flex-col gap-8 md:w-2/3 md:flex-row">
        <div className="md:w-1/2">
          <ContactForm />
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2">
          <div className="rounded-lg border border-border bg-background p-8">
            <h2 className="mb-6 text-2xl font-light">Contact Information</h2>

            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="mb-1 font-medium">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="text-primary transition-colors hover:text-highlight-1"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div>
                <p className="mb-1 font-medium">Phone</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Phone"
                  className="text-primary transition-colors hover:text-highlight-1"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div>
                <p className="mb-3 font-medium">Social Media</p>
                <div className="flex space-x-4">
                  {Object.values(siteConfig.links).map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary transition-colors hover:text-highlight-1"
                      aria-label={link.title}
                    >
                      <link.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
