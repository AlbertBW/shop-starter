"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { Textarea } from "~/app/_components/ui/textarea";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID!;

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_ID);

  if (state.succeeded) {
    return (
      <p className="text-center text-lg font-light text-muted-foreground">
        Thank you for contacting us! We will get back to you as soon as
        possible.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col space-y-4"
    >
      <div className="group relative flex h-14 w-full flex-col justify-end border border-transparent border-b-border px-2 pb-1 focus-within:border-primary">
        <Label htmlFor="email" className="sr-only">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="off"
          className="peer h-6 w-full border-0 p-0 text-lg font-light text-muted-foreground shadow-none focus-within:border-0 focus-visible:ring-0 md:text-lg"
          placeholder=""
        />
        <span className="pointer-events-none absolute left-2 text-lg font-light text-muted-foreground transition-all group-focus-within:-translate-x-1.5 group-focus-within:-translate-y-6 group-focus-within:scale-75 peer-[&:not(:placeholder-shown)]:-translate-x-1.5 peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75">
          Email*
        </span>
      </div>
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="text-destructive"
      />
      <Textarea
        id="message"
        name="message"
        placeholder="Message"
        rows={4}
        required
        className="rounded-none text-lg text-muted-foreground"
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
        className="text-destructive"
      />
      <Button
        type="submit"
        disabled={state.submitting}
        className="rounded-none font-light uppercase tracking-widest"
      >
        Submit
      </Button>
    </form>
  );
}
