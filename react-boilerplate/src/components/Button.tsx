type ButtonProps = {
  label: string,
  onClick: () => void,
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button type="button" className="bg-[#3761a8] text-white py-3 px-5 rounded" onClick={onClick}>
      {label}
    </button>
  )
}