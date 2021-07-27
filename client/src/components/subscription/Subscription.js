import React from 'react'
import { OverlayTrigger, Button, ButtonGroup } from 'react-bootstrap'

import SubscriptionPopover from './SubscriptionPopover'
import useSubscription from '../../hooks/useSubscription'

const Subscription = ({ order }) => {
    const {
        recurringProducts,
        subscribeHandler,
        manageSubscriptionBillingHandler,
    } = useSubscription()

    if (order.mode === 'payment' && order.payment.status === 'paid') {
        return recurringProducts.map(product => (
            <OverlayTrigger
                key={product.productId}
                trigger={['hover', 'focus']}
                placement="top"
                overlay={<SubscriptionPopover product={product} />}
            >
                <Button
                    className="mr-2 mb-2 mb-lg-0"
                    onClick={subscribeHandler.bind(null, {
                        priceId: product.price.id,
                        orderId: order._id,
                    })}
                >
                    {product.name}
                </Button>
            </OverlayTrigger>
        ))
    }

    if (order.subscription) {
        return (
            <>
                <Button variant="outline-success" className="mr-2" disabled>
                    {order.subscription.status}
                </Button>

                <Button
                    variant="outline-danger"
                    onClick={manageSubscriptionBillingHandler.bind(null, {
                        subscriptionId: order.subscription.id,
                        priceId: order.subscription.priceId,
                    })}
                >
                    Manage Billing
                </Button>
            </>
        )
    }

    return null
}

export default Subscription
