import React from 'react'
import { OverlayTrigger, Button } from 'react-bootstrap'

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
                    variant="secondary"
                    className="mx-2 mb-2 mb-lg-0"
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
            <div>
                <p variant="outline-info" className="mr-4 my-2">
                    Plan:{' '}
                    <span className=" font-weight-bold">
                        {order.subscription.plan.name}
                    </span>
                </p>

                <p variant="outline-info" className="mr-4 my-2">
                    Status:{' '}
                    <span className=" font-weight-bold">
                        {order.subscription.status}
                    </span>
                </p>

                <Button
                    onClick={manageSubscriptionBillingHandler.bind(null, {
                        subscriptionId: order.subscription.id,
                        priceId: order.subscription.priceId,
                    })}
                >
                    Manage Billing
                </Button>
            </div>
        )
    }

    return null
}

export default Subscription
