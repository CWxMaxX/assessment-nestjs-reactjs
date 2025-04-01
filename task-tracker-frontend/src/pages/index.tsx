import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title({ color: "violet" })}>Task Management System</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>Organize Your Team Tasks Efficiently.</div>
        </div>
      </section>
    </DefaultLayout>
  );
}
