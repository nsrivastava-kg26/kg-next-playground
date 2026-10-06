import { Modal } from "@/components/ui/modal";
import { ContactForm } from "@/features/contact/contact-form";

/**
 * Intercepting route: when the user clicks a link to /demo from within the site,
 * this renders in the @modal slot on top of the current page instead of navigating away.
 * The URL still changes to /demo, so it is shareable and the back button closes it.
 */
export default function DemoModal() {
  return (
    <Modal title="Book a demo">
      <ContactForm intent="demo" />
    </Modal>
  );
}
