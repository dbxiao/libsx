/**
 * @author dbxiao
 * @description util funcions
 */

/**
 * 随机ID值
 */
export const getUnitId = (): any => {
    return Math.random().toString(36).slice(2)
}

/**
 * 判断属性值
 * @param {Object} foo 判断对象
 * @param {String} key 对象值
 */
export const hasProperty = (foo: object, key: string): boolean => {
    return Object.prototype.hasOwnProperty.call(foo, key)
}

/**
 * 获取参数
 * @param {string} name - 参数名
 * @param {string} src - 域名，默认使用当前访问域名
 */
export const getParam = (name: string, src?: string): string => {
    const re = new RegExp('(?:^|\\?|#|&)' + name + '=([^&#]*)(?:$|&|#)', 'i')
    const m = re.exec(src || (window.location || {}).href)
    return m ? m[1] : ''
}

/**
 * 获取url的origin
 */
export const getUrlOrigin = (url: string): string => {
    let origin = ''

    if (typeof window.URL === 'function' && url) {
        const urlObj = new URL(url)
        origin = urlObj.origin
    } else {
        const a = document.createElement('a')
        a.href = url
        origin = a.protocol + '//' + a.host
    }

    return origin
}

/**
 * LocalStorage
 * @param name String name of the localStorage
 * @param value String value of the localStorage
 */
export const setItem = (name: string, value: string): void => {
    window.localStorage.setItem(name, value)
}

/**
 * LocalStorage
 * @param name String name of the localStorage
 * @returns string value of the localStorage
 */
export const getItem = (name: string): any => {
    return window.localStorage.getItem(name)
}

/**
 * LocalStorage
 * @param name String name of the localStorage
 * @returns string value of the localStorage
 */
export const removeItem = (name: string): any => {
    return window.localStorage.removeItem(name)
}

/**
 * 设置cookie
 */
export const setCookie = (name: string, value: string, expireTime?: any, path?: any, domain?: string): void => {
    const now = new Date().getTime(),
        expiresTime = new Date(now + expireTime)
    let domainStr = '',
        pathStr = '',
        expiresStr = ''

    if (domain) {
        domainStr = ';domain=' + domain
    }
    if (path) {
        pathStr = ';path=' + path
    }

    if (expireTime) {
        expiresStr = ';expires=' + expiresTime
    }

    document.cookie = name + '=' + encodeURIComponent(value) + expiresStr + pathStr + domainStr
}

/**
 * 获取cookie
 */
export const getCookie = (name: string): string => {
    let c_start: any = '',
        c_end = null

    if (window.document.cookie.length > 0) {
        c_start = window.document.cookie.indexOf(name + '=')
        if (c_start !== -1) {
            c_start = c_start + name.length + 1
            c_end = window.document.cookie.indexOf(';', c_start)
            if (c_end === -1) {
                c_end = window.document.cookie.length
            }
            return decodeURIComponent(window.document.cookie.substring(c_start, c_end))
        }
    }
    return ''
}

/**
 * 对象转换为字符串拼接
 */
export const objToStr = (obj: any): string => {
    let str = ''
    for (const x in obj) {
        str += str === '' ? x + '=' + obj[x] : '&' + x + '=' + obj[x]
    }
    return str
}

export const toString = (str: string): string => {
    let _str = ''
    if (typeof str === 'object') {
        _str = JSON.stringify(str)
    } else if (typeof str === 'undefined') {
        _str = 'undefined'
    } else {
        _str = str
    }

    return _str
}

/**
 * 是否为数组
 */
export const isArray = (obj: object): boolean => {
    if (typeof Array === 'function') {
        return Array.isArray(obj) // {} --> false, [] --> true
    }

    return Object.prototype.toString.call(obj) === '[object Array]'
}

/**
 * 是否为对象
 */
export const isObject = (obj: object): boolean => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 时间戳转换
 */
export const timestampToTime = (timestamp: number): any => {
    const date = new Date(String(timestamp).length === 10 ? timestamp * 1000 : timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return Y + M + D + h + m
}

/**
 * 对象转数组
 */
export const obj2Arr = (obj: any): any => {
    const arr = []
    if (typeof obj === 'object') {
        for (const x in obj) {
            if (hasProperty(obj, x)) {
                arr.push(obj[x])
            }
        }
    }
    return arr
}

/**
 * 格式化非标准数据
 */
export const parseJSON = (data: any) => {
    if (typeof data !== 'string' || !data) {
        return null
    }
    data = data.replace(/\n| |↵/gi, '')
    return new Function('return ' + data)()
}

/**
 * 深度obj转浅度obj
 */
export const deepObj2shallowObj = (obj: any) => {
    const data: any = {}
    const forEach = (obj: any) => {
        Object.keys(obj).forEach((keys) => {
            if (typeof obj[keys] === 'object') {
                forEach(obj[keys])
            } else if (typeof obj[keys] === 'symbol') {
                return
            } else {
                data[keys] = obj[keys]
            }
        })
    }
    forEach(obj)
    return data
}

export const inElectron = (): boolean => {
    return navigator.userAgent.toLowerCase().indexOf('electron') !== -1
}

export const dealRealTimeGraphData = (mainTable: any, assitantTable: any) => {
    const edge = [mainTable, assitantTable].map((i, index) => {
        return {
            id: i.name,
            shape: 'er-rect',
            label: i.name,
            width: 150,
            height: 24,
            position: {
                x: 24 + index * 230,
                y: 150,
            },
            ports: i.columnList?.map((k: any) => {
                return {
                    id: k.name,
                    group: 'list',
                    attrs: {
                        portNameLabel: {
                            text: k.name,
                        },
                        portTypeLabel: {
                            text: k.primitiveType,
                        },
                    },
                }
            }),
        }
    })
    const line =
        mainTable.columnList
            ?.filter((j: any) => {
                const c = assitantTable.columnList?.find((k: any) => {
                    return j.name === k.name
                })
                return c?.name
            })
            .map((item: any, index: number) => {
                return {
                    id: index,
                    shape: 'edge',
                    source: {
                        cell: mainTable.name,
                        port: item.name,
                    },
                    target: {
                        cell: assitantTable.name,
                        port: item.name,
                    },
                    attrs: {
                        line: {
                            stroke: '#A2B1E3',
                            strokeWidth: 2,
                        },
                    },
                    zIndex: 0,
                }
            }) ?? []
    return [...edge, ...line]
}

// return a promise
export const copyToClipboard = (textToCopy: string) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy)
    } else {
        // text area method
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        // make the textarea out of viewport
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res(0) : rej()
            textArea.remove()
        })
    }
}

// set value by path for tar property
// notice that the function will change tar, so save one more copy of data before use the function
/**
 *
 * @param path
 * @param tar
 * @param operation
 * @param splitChar
 * @returns
 */
export function operationWithGetValueByPath<T>(
    path: string,
    tar: T,
    operation: (parent: any, key: string, val: any) => void,
    splitChar = '/',
) {
    const reg = new RegExp(`[^${splitChar}]+`, 'g')

    const steps = path.match(reg)

    function traverseStep(target: Record<string, any>) {
        if (steps.length == 0 || !target || typeof target !== 'object') return target
        if (Array.isArray(target)) {
            const len = target.length
            for (let i = 0; i < len; ++i) {
                traverseStep(target[i])
            }
        } else {
            const key = steps.shift()
            if (steps.length === 0) {
                operation(target, key, target[key])
            } else {
                traverseStep(target[key])
            }
            steps.unshift(key)
        }
    }

    traverseStep(tar)

    return tar
}
/**
 * set the intermediate ellipsis for long sentence
 */
export function midElliptical(sentence: string, limit: number, fill = '...') {
    const size = sentence.length
    const ellTar = size - limit
    if (ellTar <= 0 || limit <= 0) return sentence
    let l = Math.floor(size / 2)
    let r = l
    let moveLeft = true
    while (r - l + 1 < ellTar) {
        if (moveLeft) {
            l--
        } else {
            r++
        }
        moveLeft = !moveLeft
    }
    return sentence.slice(0, l) + fill + sentence.slice(r + 1)
}

/**
 * count value width with fontSize & fontFamily
 */
export function measureValueWidth(value: string, fontSize = 16, fontFamily = 'arial') {
    const font = `${fontSize}px ${fontFamily}`
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = font
    const { width } = context.measureText(value)
    // document.removeChild(canvas)
    return width
}
/*
 * get filter entries for antd table header filter
 * */
export const getFiltersEntries = (obj: { [key: string]: string[] }) => {
    const k: Record<string, string> = {}
    Object.keys(obj).forEach((key) => {
        if (obj[key]?.[0]) {
            k[key] = obj[key]?.[0]
        }
    })
    return k
}

/**
 * The size of the browser window
 * @returns
 */
export const getWinInnerSize = () => {
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    return {
        innerWidth,
        innerHeight,
    }
}

// formatAsCurrency('-1019234801211.2142345678') => '-1,019,234,801,211.2142345678'
export const formatAsCurrency = (arg: string | number) => {
    const num = parseFloat(arg?.toString?.()) || 0
    if (!isNaN(num)) {
        return num.toLocaleString('en-US')
    }
    return arg.toString()
}

const validateRules = [
    (val: any) => {
        const badValues: (undefined | null)[] = [undefined, null]
        return badValues.indexOf(val) === -1
    },
    (val: any) => {
        return typeof val !== 'object'
    },
]

export function splitQueryToPath(
    originPath: string,
    queryDataObj: Record<string, unknown>,
    pickKeys: (keyof typeof queryDataObj)[] | undefined,
) {
    if (typeof originPath !== 'string') {
        return ''
    }
    if (!queryDataObj || typeof queryDataObj !== 'object') {
        return originPath
    }
    if (!Array.isArray(pickKeys)) {
        pickKeys = Object.keys(queryDataObj)
    }
    let queryStr = `?`
    pickKeys.forEach((key) => {
        const valid = validateRules.every((validateFunc) => {
            return validateFunc(queryDataObj[key])
        })
        if (valid) {
            queryStr += `${key}=${queryDataObj[key]}&`
        }
    })

    return originPath + queryStr.slice(0, queryStr.length - 1)
}

export function getNameValueFromPath(path: string, name: string) {
    const reg = new RegExp(`(?<=${name}=)[^&]*`)
    const value = path.match(reg)
    const ans = value && value.length !== 0 ? (value.length === 1 ? value[0] : value) : ''
    return ans
}

export function JSONToCSV(header: { name: string; key: string }[], data: Record<string, string | number>[]) {
    let CSVContent = 'data:text/csv;charset=utf-8,\ufeff'
    if (
        !header ||
        !data ||
        !Array.isArray(header) ||
        !Array.isArray(data) ||
        header.length === 0 ||
        data.length === 0
    ) {
        return CSVContent
    }

    const CSVHeader = header.map((h) => h.name).join(',')
    const keys = header.map((h) => h.key)
    CSVContent += CSVHeader + '\r\n'
    return data.reduce((ctx, line, index) => {
        if (!line || typeof line !== 'object') {
            return ctx
        }
        const lineCtx = keys.reduce((lineCtx, k) => {
            const itemCtx = (line[k] || '') + ','
            lineCtx += itemCtx
            return lineCtx
        }, '')
        ctx += index < data.length - 1 ? lineCtx.replace(/,$/, '\r\n') : lineCtx.replace(/,$/, '')
        return ctx
    }, CSVContent)
}

// todo： 下载安全问题， 在http环境下有报错，https环境下正常
export function downloadCSV(
    fileName: string,
    header: { name: string; key: string }[],
    data: Record<string, string | number>[],
) {
    const CSVCtx = JSONToCSV(header, data)
    const a = document.createElement('a')
    a.href = encodeURI(CSVCtx)
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(CSVCtx)
}

export function resolveSelectData(data: { label: string; value: string | number }[]) {
    if (!Array.isArray(data)) {
        return []
    }
    const countMap = new Map()
    return data.map(({ label, value }) => {
        const cnt = countMap.get(label) || 0
        countMap.set(label, cnt + 1)
        if (!cnt) {
            return {
                label,
                value,
            }
        } else {
            return {
                label: `${label}(${cnt})`,
                value,
            }
        }
    })
}

export const resolvePercentage = (val: number | string) => {
    val = +val
    if (Number.isNaN(val)) {
        return '?'
    }
    if (val <= 1) {
        val *= 100
    }
    return `${val.toFixed(2)}%`
}

export function resolveQueryParamsOnPath(value: string) {
    if (typeof value !== 'string') return value
    const emptyStrs = ['null', 'undefined']
    const isEmptyValue = emptyStrs.includes(value)
    return isEmptyValue ? '' : value
}

export function ms2s(value: string | number) {
    const valueNum = +value
    const unit = 1000
    if (Number.isNaN(valueNum)) {
        return '0s'
    }
    const sVal = valueNum / unit
    return sVal.toFixed(2)
}

export function resolveEmptyValueFieldFromObject(values: Record<string, any>) {
    if (!values || typeof values !== 'object') return {}
    const emptyValues = ['', undefined, null]
    const ans = Object.entries(values).reduce((pre, [key, value]) => {
        const isEmptyValue = emptyValues.includes(value)
        if (!isEmptyValue) {
            pre[key] = value
        }
        return pre
    }, {})
    return ans
}

export function isEmptyValue(value: any) {
    const emptyValues = [undefined, null, '']
    return emptyValues.includes(value)
}

export function resolveNumber(value: any, NanReplaceChar?: string) {
    const unValidValues = [false, undefined, null, '']
    if (unValidValues.includes(value) || Number.isNaN(+value)) {
        return typeof NanReplaceChar === 'string' ? NanReplaceChar : NaN
    }
    return +value
}
