/**
 * Closes the modal on soft navigation. Without this catch-all, the slot would keep
 * showing the last intercepted route (the dialog) after the user navigates elsewhere.
 */
export default function ModalCatchAll() {
  return null;
}
