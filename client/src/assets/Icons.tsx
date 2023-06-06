

type EditIconProps = {
  clicked?: () => void,
  color?: string,
}
export const EditIcon = (options?:EditIconProps) => {
  const {clicked, color = 'text-primary'} = options || {};
  if (clicked === undefined){
    return (
      <i className={`fs-3 text-center ${color} bi bi-pencil-square`}></i>
    )
  }
  return (
    <i className={`clickable fs-3 text-center ${color} bi bi-pencil-square`} onClick={clicked}></i>
  )
}

type DeleteIconProps = {
  clicked?: () => void,
  className?: string,
  color?: string,
}

export const DeleteIcon = (options?:DeleteIconProps) => {
  const {clicked, color = 'text-danger', className=''} = options || {};
  if (clicked === undefined){
    return (
      <i className={`fs-3 text-center ${color} bi bi-trash3-fill ${className}`}></i>
    )
  }
  return (
    <i className={`clickable fs-3 text-center ${color} bi bi-trash3-fill ${className}`} onClick={clicked}></i>
  )
}

type AddIconProps = {
  clicked?: () => void,
  color?: string,
}

export const AddIcon = (options?:AddIconProps) => {
  const {clicked, color = 'text-success'} = options || {};
  if (clicked === undefined){
    return (
      <i className={`fs-3 text-center ${color} bi bi-plus-circle-fill`}></i>
    )
  }
  return (
    <i className={`clickable fs-3 text-center ${color} bi bi-plus-circle-fill`} onClick={clicked}></i>
  )
}

type SaveIconProps = {
  className?: string,
  clicked?: () => void,
  color?: string,
}

export const SaveIcon = (options?:SaveIconProps) => {
  const {className = '' ,clicked, color = 'text-primary'} = options || {};
  if (clicked === undefined){
    return (
      <i className={`fs-3 text-center ${color} bi bi-save2 ${className}`}></i>
    )
  }
  return (
    <i className={`clickable fs-3 text-center ${color} bi bi-save2 ${className}`} onClick={clicked}></i>
  )
}


type CopyProps = {
  clicked: () => void,
}
export const CopyIcon = ({clicked}:CopyProps) => {
  return (
    <i className="clickable fs-3 text-center text-primary bi bi-clipboard-fill" onClick={clicked}></i>
  )
}
type AnswerIconProps = {
  clicked: () => void
}
export const AnswerIcon = ({clicked}:AnswerIconProps) =>{
  return (
    <i className="clickable fs-3 text-center text-primary bi bi-chat-right-text-fill" onClick={clicked}></i>
  )
}

