import { Polybase } from '@polybase/client'
import Wallet from 'ethereumjs-wallet'
import { ethPersonalSign } from '@polybase/eth'


export async function createCollection (pvt, name , collectionName) {
    const db = new Polybase({
    signer: async (data) => {
      const wallet = Wallet.fromPrivateKey(Buffer.from(pvt, 'hex'))
      return { h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    },
  })

  if (!pvt) {
    throw new Error('No private key provided')
  }

  await db.applySchema(`
  collection ${collectionName} {
    id: string; 
    title?: string;
    content?: string;
    completed?: string;
  
    constructor (id: string, title: string, content: string, completed: string) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.completed = completed;
    }
  
    updateStatus(completed?: string) {
        this.completed = completed;
    }
  }
  `, name)

  return 'Schema loaded'
}
