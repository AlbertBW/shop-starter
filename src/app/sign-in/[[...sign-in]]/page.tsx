import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="dark flex flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
