import React from 'react'
import { Container, Popover } from 'react-bootstrap'
import priceFormatter from '../utils/priceFormatter'

const SubscriptionPopover = React.forwardRef(
    ({ product, children, ...props }, ref) => {
        return (
            <Popover id="popover-basic" ref={ref} {...props}>
                <Container className="p-4">
                    <h5 className="text-uppercase">{product.name}</h5>
                    <p>{product.description}</p>
                    <div className="d-flex align-items-center">
                        <h2 className="font-weight-bold">
                            {priceFormatter(product.price.unitAmount)}
                        </h2>
                        <sub> / {product.price.recurringInterval}</sub>
                    </div>
                </Container>
            </Popover>
        )
    }
)

export default SubscriptionPopover
