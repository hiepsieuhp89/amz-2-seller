
export interface WithdrawRequest {
    date: string
    id: string
    amount: string
    status: string
    message: string
}

export interface WalletHistory {
    date: string
    id: string
    amount: string
    beforeBalance: string
    afterBalance: string
    message: string
    type: string
}

export interface OrderHistory {
    date: string
    id: string
    orderCode: string
    status: string
    amount: string
}