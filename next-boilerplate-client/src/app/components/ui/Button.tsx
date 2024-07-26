/* TYPES */


interface Props {
  onClick?: () => void,
  text: string,
  isDisabled?: boolean, 
  isPrimary?: boolean,
}


/* MAIN */


export default function({ onClick, text, isDisabled = false, isPrimary = true }: Props) {
  const isClickable = onClick && !isDisabled;
  const resolveOnClick = isClickable ? onClick : () => null;
  const disabledStyle = isClickable ? '' : 'opacity-70';
  const buttonStyle = isPrimary
    ? 'bg-green500 text-white py-[8px] px-[15px] rounded-[10px] shadow-primaryButton'
    : 'text-grey700'

  return (
    <button 
      disabled={!isClickable}
      className={`leading-[20px] text-[14px] font-medium ${buttonStyle} ${disabledStyle}`}
      onClick={() => resolveOnClick()}
    >
      {text}
    </button>
  )

}


