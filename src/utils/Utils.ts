export const formatNumber = (num: number) => {
  if (num === undefined || num === null) {
    return num
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

export const formatTime = (datetimeStr: string) => {
  const datetime = new Date(datetimeStr)
  const datePortion = datetime.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })
  const timePortion = datetime.toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit", hour12: false })
  const formatted = `${datePortion} | ${timePortion}`

  return formatted
}

export function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, setFunction: React.Dispatch<React.SetStateAction<any>>) {
  const { name, value } = e.target;
  setFunction((prevForm: FormData) => ({
    ...prevForm,
    [name]: value,
  }));
}