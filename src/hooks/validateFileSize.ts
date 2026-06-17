const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024

export const validateFileSize = (value: number | null | undefined): string | true => {
  if (value == null) return true
  if (value > MAX_FILE_SIZE_BYTES) {
    return 'Размер файла не должен превышать 15 МБ'
  }
  return true
}
