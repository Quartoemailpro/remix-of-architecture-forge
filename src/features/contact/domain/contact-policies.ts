export function isContactFormValid(subject: string, message: string): boolean {
  return subject.trim().length > 0 && message.trim().length > 0;
}
