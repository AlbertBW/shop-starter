"use client";

import { useUser } from "@clerk/nextjs";
import { LoadingSpinnerSmall } from "~/app/_components/loading-spinner";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { addressSchema } from "~/server/schemas/address";
import { Label } from "~/app/_components/ui/label";
import { Input } from "~/app/_components/ui/input";
import { useLocalStorage } from "~/app/_hooks/use-local-storage";
import { api } from "~/trpc/react";
import getStripe from "~/utils/get-stripejs";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="h-4 text-sm text-red-500">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        <em>{field.state.meta.errors[0].message}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export default function CheckoutForm({ formId }: { formId: string }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionId } = useLocalStorage();

  const createOrder = api.order.createOrder.useMutation({
    onSuccess: async ({ checkoutSessionId }) => {
      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      county: "",
      postCode: "",
      country: "",
      phone: "",
      cartSessionId: sessionId ?? "",
    },
    validators: {
      onChange: addressSchema,
    },
    onSubmit: ({ value }) => {
      createOrder.mutate(value);
    },
  });

  return (
    <form
      className="w-full space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      id={formId}
    >
      {!isLoaded ? (
        <div>
          <div
            className="mb-4 h-7 w-44 animate-pulse rounded-md bg-muted text-xl font-medium"
            aria-hidden
          ></div>
          <div className="h-6">
            <LoadingSpinnerSmall />
          </div>
        </div>
      ) : isSignedIn ? (
        <div>
          <h2 className="mb-4 text-xl font-medium">Your contact details</h2>
          <p>{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-xl font-medium">Contact Information</h2>

          <div className="space-y-4">
            <form.Field
              name="email"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-xl font-medium">Shipping Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form.Field
            name="firstName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="lastName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="addressLine1"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div className="md:col-span-2">
                <Label htmlFor="addressLine1" className="text-sm font-medium">
                  Address line 1
                </Label>
                <Input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="addressLine2"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div className="md:col-span-2">
                <Label htmlFor="addressLine2" className="text-sm font-medium">
                  Address line 2 (optional)
                </Label>
                <Input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="city"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="city" className="text-sm font-medium">
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="county"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="county" className="text-sm font-medium">
                  County
                </Label>
                <Input
                  type="text"
                  id="county"
                  name="county"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="postCode"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="postCode" className="text-sm font-medium">
                  Post code
                </Label>
                <Input
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="country"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="phone"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
      </div>
    </form>
  );
}
