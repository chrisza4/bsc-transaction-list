import axios from 'axios'
import keccak256 from 'keccak256'

export type BscTransaction = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddresstring
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
}
export type BscResponse = {
  status: '1'
  message: string
  result: readonly BscTransaction[]
}

export async function getTransactions(apiKey: string, contract: string) {
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${contract}&sort=desc&apikey=${apiKey}`
  const response = await axios.get<BscResponse>(url)
  return response.data.result
}

export function getMethodCode(methodSignature: string): string {
  return keccak256(methodSignature).toString('hex').substring(0, 8) as string
}
