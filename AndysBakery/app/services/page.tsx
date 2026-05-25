"use client";
import Image from "next/image";
import TopBarNav from "../components/TopBarNav"
import BottomSheetNav from "../components/BottomSheetNav"
import lashlift1 from "../images/lashlift1.jpeg"
import lashlift2 from "../images/lashlift2.jpeg"
import fullSet1 from "../images/fullSet1.jpeg"
import pageCSS from "./page.module.css"
import servicesCSS from "./services.module.css"
import { BiMinusCircle } from "react-icons/bi";

import { useRouter } from "next/router";

import { useState } from "react";
import { useCart } from "../context/cartContext";

import Link from 'next/link';
import { duration } from "drizzle-orm/gel-core";



const services = [
  {
    category: "Cakes",
    items: [
      {
        id: "chocolate-cake",
        name: "Chocolate Cake",
        Price: 35,
        duration: 0,
        description: "Rich chocolate cake with buttercream frosting.",
        sizes: [
          // { size: '6"', price: 35 },
          // { size: '10"', price: 65 },
          // { size: '20"', price: 120 },
        ],
      },
      {
        id: "vanilla-cake",
        name: "Vanilla Cake",
        price: 35,
        duration: 0,  
        description: "Soft vanilla cake with classic frosting.",
        sizes: [
          // { size: '6"', price: 30 },
          // { size: '10"', price: 60 },
          // { size: '20"', price: 110 },
        ],
      },
    ],
  },
  {
    category: "Pastries",
    items: [
      {
        id: "croissant",
        name: "Croissant",
        price: 35,
        duration: 0,
        description: "Flaky butter pastry baked fresh.",
        sizes: [
          // { size: "Single", price: 4 },
          // { size: "Half Dozen", price: 20 },
          // { size: "Dozen", price: 38 },
        ],
      },
    ],
  },
  {
    category: "Bread",
    items: [
      {
        id: "sourdough",
        name: "Sourdough Bread",
        price: 35,
        duration: 0,
        description: "Fresh baked sourdough loaf.",
        sizes: [
          // { size: "Small", price: 6 },
          // { size: "Medium", price: 9 },
          // { size: "Large", price: 12 },
        ],
      },
    ],
  },
  {
    category: "Custom Orders",
    items: [
      {
        id: "custom-cake",
        name: "Custom Cake Order",
        price: 35,
        duration: 0,
        description: "Custom pricing depends on size, flavor, and design.",
        sizes: [
            // { size: "Basic", price: 50 },
            // { size: "Detailed", price: 100 },
            // { size: "Premium", price: 150 },
        ],
      },
    ],
  },
];




export default function Services() {

  // const router = useRouter() // used for cleaner redirects as buttons
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { cart } = useCart();
  const { addToCart } = useCart();
  const { removeFromCart } = useCart();
  const { clearCart } = useCart();
  const { checkCart } = useCart();

  const exists = cart.length > 0;


  const totalPrice = cart.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalDuration = cart.reduce(
    (total, service) => total + service.duration,
    0
  );


  return (
    <div className="body-wrap boxed-container">
      <main>


        {/* <div className={pageCSS.card}>
          <div className={pageCSS.cardImage}></div>
          <p className={pageCSS.cardTitle}>LuxxBeeBeauty - 1930 Pennsylvania Ave, ste B</p>
          <div className={pageCSS.info}>

            <p className={pageCSS.cardBody}>Tuesday -  Saturday (9 AM - 6 PM)</p>
            <p className={pageCSS.cardBody}>

            </p>

          </div>
          <div className={pageCSS.socials}>

            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e100ff"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#ffffff"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#ffffff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#ffffff"></path> </g></svg>
            <a href="https://www.instagram.com/luxxbeebeauty/">@luxxbeebeauty</a>
          </div>

          <div className={pageCSS.socials}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#006af5"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#009dff"></path> </g></svg>
            <a href="https://www.facebook.com/p/Erykah-Pope-100076393427307/">@luxxbeebeauty</a>

          </div>
          <p className={pageCSS.footer}>Last Updated <span className={pageCSS.byName}>LuxxBeeBeauty</span> on <span className="date">3/19/26</span></p>
        </div> */}

        <div className={pageCSS.appointmentPage}>
          <div className={servicesCSS.servicesPage}>

            {services.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === category.category ? null : category.category)
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span>{category.category}</span>
                  <span>{openCategory === category.category ? "▲" : "▼"}</span>
                </button>
              {openCategory === category.category && (
                <>
                {category.items.map((item) => {
                  const exists = cart.some((cartItem) => cartItem.id === item.id);

                  return (
                    <div key={item.id} className={servicesCSS.servicesContainer}>
                      <div>
                        <div className={servicesCSS.textContent}>
                          <button
                            onClick={() =>
                              setOpenItem(openItem === item.id ? null : item.id)
                            }
                            className="w-full flex justify-between items-center text-left"
                          >
                            <span>{item.name}</span>
                            <span>{openItem === item.id ? "▲" : "▼"}</span>
                          </button>
                          {openItem === item.id && (
                            <div style={{ padding: "10px 0" }}>
                              <p>{item.description}</p>

                              <p style={{ fontWeight: "bold" }}>
                                Starting at ${item.price}
                              </p>

                              <p>
                                Sizes:
                               {item.sizes.map((size: { size: string; price: number }) => (
                                  <span key={size.size}>
                                    {" "}
                                    {size.size} (${size.price})
                                  </span>
                                ))}
                              </p>
                            </div>
                          )}

                          <p className={servicesCSS.heroParagraphServices}>
                            {item.description}
                          </p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", width: "8rem" }}
                          onClick={() =>
                            exists
                              ? removeFromCart(item.id)
                              : addToCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price || 0,
                                  duration: item.duration || 0,
                                })
                          }
                          className={exists ? servicesCSS.removeBtn : servicesCSS.addBtn}
                        >
                          {exists ? "Remove Service" : "Add Service"}
                        </div>
                      </div>
                    </div>
                  );
                })}
                </>
               )} 
              </div>

            ))}
          </div>


          <div className={pageCSS.cartContainer}>
            {exists &&
              <h2 className={pageCSS.cartTitle}>Selected Services</h2>
            }

            {exists &&
              <table className={pageCSS.cartTable}>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <p className={pageCSS.serviceName}>{service.name}</p>
                      </td>

                      <td style={{ paddingLeft: "1rem" }}>{service.duration} min</td>
                      <td style={{ paddingLeft: "1rem" }}>${service.price}</td>

                      <td>
                        <BiMinusCircle onClick={() => removeFromCart(service.id)} className={pageCSS.removeButton} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            {exists ?
              <div className={pageCSS.cartSummary}>
                <p>Total Duration: {totalDuration} min</p>
                <p>Total: ${totalPrice}</p>
              </div>
              :
              <div></div>
            }


            {exists ?

              <div className={servicesCSS.checkoutButton} style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>
                <Link href="/services/book" className={pageCSS.bookBtn} style={{ pointerEvents: "auto", color: "rgb(198, 153, 134)", width: "auto", fontWeight: "bold" }}>
                  Book Now
                </Link>
              </div>

              : <h5 style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>Cart is empty {":("} </h5>
            }


          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Please see my policies if this is your first time booking!
          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Durations are estimated
          </div>



        </div>
      </main>
      <BottomSheetNav />

    </div>
  )
}