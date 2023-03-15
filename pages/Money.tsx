import { addresses } from '../addresses/addresses'

type Props = {}

function Money({}: Props) {
  return <div>{Object.keys(addresses.coins.WETH)}</div>
}

export default Money
