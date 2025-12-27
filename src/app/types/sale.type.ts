export type SaleItem = {
    productId: string,
    productName: string,
    quantity: number,
    price?: number,
    unitPrice?: number,
    pricePerUnit?: number,
    itemPrice?: number
}

export type Sale = {
    id: string,
    userId: string,
    userName: string,
    userEmail: string,
    items: SaleItem[],
    total: number,
    date: string,
    status?: string
}

