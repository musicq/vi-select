interface classType {
  [key: string]: boolean | undefined
}

export function classnames(
  ...cls: Array<string | classType | undefined | boolean>
) {
  const r = []

  for (const c of cls) {
    if (!Boolean(c)) continue

    if (typeof c === 'string') {
      r.push(c)
    } else if (typeof c === 'object') {
      Object.keys(c).forEach(k => Boolean(c[k]) && r.push(k))
    }
  }

  return r.join(' ')
}