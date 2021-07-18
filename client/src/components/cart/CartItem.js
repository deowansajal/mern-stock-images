import React from 'react'
import { Image } from 'react-bootstrap'
import Icon from '../utils/Icon'
import { Td } from '../table/Table'
import priceFormatter from '../utils/priceFormatter'

const tdStyle = {
    verticalAlign: 'middle',
}

const CartItem = ({ cartItem, removeFromCart }) => {
    return (
        <tr>
            <Td style={tdStyle}>
                <div
                    style={{
                        maxWidth: '120px',
                    }}
                >
                    <Image
                        fluid
                        src={`/uploads/${cartItem.thumbnail}`}
                        alt=""
                    />
                </div>
                Lorem ipsum dolor sit amet cing elit. Dolor, non.
            </Td>
            <Td style={tdStyle}>{priceFormatter(cartItem.price)}</Td>
            <Td style={tdStyle}>
                <Icon
                    onClick={() => removeFromCart(cartItem.id)}
                    name="close"
                    style={{
                        cursor: 'pointer',
                    }}
                />
            </Td>
        </tr>
    )
}

export default CartItem
