import axios from 'axios'
import dotenv from 'dotenv'
import keccak256 from 'keccak256'
import { autoFarmDeployer } from './addresses'
dotenv.config()

type BscTransaction = {
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
type BscResponse = {
  status: '1'
  message: string
  result: readonly BscTransaction[]
}

async function getTransactions(apiKey: string, contract: string) {
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${contract}&sort=desc&apikey=${apiKey}`
  const response = await axios.get<BscResponse>(url)
  return response.data.result
}
function getMethodCode(methodSignature: string): string {
  return keccak256(methodSignature).toString('hex').substring(0, 8) as string
}

async function main() {
  const apiKey = process.env.BSC_API_KEY
  const transactions = await getTransactions(apiKey, autoFarmDeployer)
  const methodCode = getMethodCode('earn(address)')
  const result = transactions.filter((t) =>
    t.input.startsWith(`0x${methodCode}`)
  )
  console.log(result)
}
// 0x28579eca0a326e53340edd93e18698d379876a04
main().catch((err) => console.error(err))
