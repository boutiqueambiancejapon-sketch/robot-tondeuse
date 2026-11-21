// Short label of a chart bucket ("14 h" or "03/11") from the YYYY-MM-DDTHH:MI form the queries return.

export function bucketLabel(bucket: string, hourly: boolean): string {
  const [date = '', time = ''] = bucket.split('T')
  const [, m, d] = date.split('-')
  return hourly ? `${time.slice(0, 2)} h` : `${d}/${m}`
}
