import Stripe from "stripe"; 
const { NextResponse } = require("next/server");

export async function GET() {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) // pagina
    const prices = await stripe.prices.list()


    return NextResponse.json(prices.data)
}