import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as Core from './core'
dotenv.config()
const args = yargs(hideBin(process.argv)).string('address').argv as {
  [key: string]: string
}

async function main() {
  const apiKey = process.env.BSC_API_KEY
  const address = args.address
  const methodSignature = args.methodSignature
  if (!address) {
    throw Error('Please specify address via --address parameter')
  }

  // Run
  const transactions = await Core.getTransactions(apiKey, address)
  const methodCode = methodSignature ? Core.getMethodCode(methodSignature) : ''
  const result = methodCode
    ? transactions.filter((t) => t.input.startsWith(`0x${methodCode}`))
    : transactions

  // Display
  console.log(result)
}
// 0x28579eca0a326e53340edd93e18698d379876a04
main().catch((err) => console.error(err))
