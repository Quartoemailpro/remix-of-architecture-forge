import { isContactFormValid } from "../domain/contact-policies";

export interface ContactFormState {
  canSubmit: boolean;
}

export function getContactFormState(subject: string, message: string): ContactFormState {
  return {
    canSubmit: isContactFormValid(subject, message),
  };
}
