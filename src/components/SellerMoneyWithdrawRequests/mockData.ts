export const mockWithdrawRequests = [
    {
        date: "2025-03-18 10:00:00",
        id: "WD20250318100000",
        amount: "$50.00",
        status: "pending",
        message: "Yêu cầu rút tiền đang chờ xử lý"
    },
    {
        date: "2025-03-17 15:30:00",
        id: "WD20250317153000",
        amount: "$30.00",
        status: "completed",
        message: "Rút tiền thành công"
    }
]

export const mockWalletHistory = [
    {
        id: "20250317375367",
        date: "2025-03-17 14:06:07",
        amount: "$0.00",
        beforeBalance: "$0.00",
        afterBalance: "$0.00",
        message: "Nâng cấp gói",
        type: "debit"
    }
]

export const mockOrderHistory = [
    {
        id: "20250318212958",
        date: "2025-03-18 06:27:03",
        orderCode: "20250318-06264665",
        status: "pending",
        amount: "$12.70"
    }
]