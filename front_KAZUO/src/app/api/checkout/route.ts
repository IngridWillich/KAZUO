import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    const { priceId } = await request.json()
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription', //pago recurrente, pero también esta subcription
        payment_method_types: ['card'], // card es el general
        line_items: [
            { // acá podemos ajustar la cantidad, precio. Ya que cada cosa y lista representa un producto. Pero nosotros ya tenemos integrado esto por el priceId
                price: priceId,
                quantity: 1
            }
        ],
        success_url: 'http://localhost:3000/GestionInventario',
        cancel_url: 'http://localhost:3000/Planes',
    })
    // console.log(session);
    return NextResponse.json({ url: session.url });

}