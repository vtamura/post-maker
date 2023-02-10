import { formatDistanceToNow, parseISO } from 'date-fns'

const dateNow = (timestamp: string) => formatDistanceToNow(parseISO(timestamp))

export default dateNow
