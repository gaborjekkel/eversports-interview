/* TYPES */

interface Props {
  isChecked: boolean
}

/* MAIN */


// This component can be extended with local state management by adding useState and onClick
export default function Checkbox({ isChecked }: Props) {
  return (
    <span 
      role="checkbox" 
      aria-checked={isChecked} 
      className="flex items-center justify-center w-[16px] h-[16px] rounded-[4px] border border-solid border-grey500"
    >
      {isChecked && (
        <div className="flex w-[12px] h-[12px] rounded-[2px] bg-green500 items-center justify-center p-[2px] text-white">
        <svg width="100%" height="100%" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.84375 0.65625C7.04688 0.84375 7.04688 1.17188 6.84375 1.35938L2.84375 5.35938C2.65625 5.5625 2.32812 5.5625 2.14062 5.35938L0.140625 3.35938C-0.0625 3.17188 -0.0625 2.84375 0.140625 2.65625C0.328125 2.45312 0.65625 2.45312 0.84375 2.65625L2.5 4.29688L6.14062 0.65625C6.32812 0.453125 6.65625 0.453125 6.84375 0.65625Z" fill="currentColor"/>
        </svg>
      </div>
      )}
    </span>
  )
}


