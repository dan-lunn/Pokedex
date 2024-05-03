type DropdownItemProps = {
  data: string[],
  onClick: (value: string) => void,
}

export function DropdownItem({ data = [], onClick }: DropdownItemProps) {
  return (
    <div className="shadow h-auto w-40 absolute">
      <ul>
        {data.map((item, i) => (
          <li
            key={i}
            className="p-3 border text-black bg-white hover:bg-[#feca1c] cursor-pointer"
            onClick={() => onClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}