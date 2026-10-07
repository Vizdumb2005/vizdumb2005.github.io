// A labelled placeholder for assets Viren has not sent yet.
export function Slot({ label, ratio = "16 / 9" }: { label: string; ratio?: string }) {
  return (
    <div role="img" aria-label={`Placeholder: ${label}`} className="mono grid place-items-center border border-dashed border-line text-xs text-cool" style={{ aspectRatio: ratio }}>
      <span>Awaiting: {label}</span>
    </div>
  );
}
