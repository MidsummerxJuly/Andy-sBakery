"use client";
import TopBarNav from "../components/TopBarNav"
import BottomSheetNav from "../components/BottomSheetNav"
import lashlift1 from "../images/lashlift1.jpeg"
import lashlift2 from "../images/lashlift2.jpeg"
import fullSet1 from "../images/fullSet1.jpeg"
import pageCSS from "./page.module.css"
import servicesCSS from "./services.module.css"
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import Image from "next/image";
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
        price: 35,
        duration: 0,
        description: "Rich chocolate cake with buttercream frosting.",
        sizes: [
          { size: '6" Small', price: 35, serves: "6–8" },
          { size: '8" Medium', price: 45, serves: "10–14" },
          { size: '10" Large', price: 60, serves: "18–24" },
        ],
      },
      {
        id: "vanilla-cake",
        name: "Vanilla Cake",
        price: 35,
        duration: 0,  
        description: "Soft vanilla cake with classic frosting.",
        sizes: [
          { size: '6" Small', price: 35, serves: "6–8" },
          { size: '8" Medium', price: 45, serves: "10–14" },
          { size: '10" Large', price: 60, serves: "18–24" },
        ],
      },
      {
        id: "cake-slice",
        name: "Cake Slice",
        price: 7.5,
        duration: 0,
        description: "Individual slice of cake. Flavor availability may vary.",
        sizes: [
          { size: '3"', price: 7.5 },
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
            { size: "Basic", price: 50 },
            { size: "Detailed", price: 100 },
            { size: "Premium", price: 200 },
        ],
      },
    ],
  },
];




export default function Services() {

  // const router = useRouter() // used for cleaner redirects as buttons
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [quantityInputs, setQuantityInputs] = useState<{ [key: string]: string }>({});
  const [activeQtyEditor, setActiveQtyEditor] = useState<{
    id: string;
    mode: "add" | "subtract";
  } | null>(null);

  const [basketQtyInput, setBasketQtyInput] = useState("");
  const { cart } = useCart();
  const { addToCart } = useCart();
  const { updateQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const { removeFromCart } = useCart();
  const { clearCart } = useCart();
  const { checkCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: string]: { size: string; price: number; serves?: string };
  }>({});

  const exists = cart.length > 0;
  const [customStep, setCustomStep] = useState<{ [key: string]: number }>({});

  const totalPrice = cart.reduce(
    (total, service) => total + service.price * service.quantity,
    0
  );
  const totalDuration = cart.reduce(
    (total, service) => total + service.duration,
    0
  );


  return (
    <div className="body-wrap boxed-container">
      <main>
        <header className={pageCSS.bakeryHeader}>
          <img
            src="/images/corner-img.png"
            alt=""
            className={pageCSS.flowerBanner}
          />
          <button className={pageCSS.menuButton}>☰ Menu</button>

          <div className={pageCSS.logoArea}>
            <Image
              src="/images/andy-logo-transparent.png"
              alt="Andy's Gourmet Bakery logo"
              width={170}
              height={170}
              className={pageCSS.bakeryLogo}
            />

            <div className={pageCSS.contactRow}>
              <span>📞 754-242-4383</span>
              <span>|</span>
              <span>🧁 6947 Stirling Road Davie, FL 33314</span>
            </div>
          </div>

          <div className={pageCSS.qrBox}>
            <div className={pageCSS.qrPlaceholder}>
              QR
            </div>

            <p className={pageCSS.followText}>Follow Us</p>
          </div>

          <div className={pageCSS.headerWave}>
            <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
              <path
                d="
                  M0,12
                  Q25,4 50,12
                  T100,12
                  T150,12
                  T200,12
                  T250,12
                  T300,12
                  T350,12
                  T400,12
                  T450,12
                  T500,12
                  T550,12
                  T600,12
                  T650,12
                  T700,12
                  T750,12
                  T800,12
                  T850,12
                  T900,12
                  T950,12
                  T1000,12
                  T1050,12
                  T1100,12
                  T1150,12
                  T1200,12
                "
              />
            </svg>
          </div>
        </header>
        
        <div className={pageCSS.appointmentPage}>
          <div className={servicesCSS.servicesPage}>

            {services.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === category.category ? null : category.category)
                  }
                  className={servicesCSS.categoryButton}
                >
                  <span>{category.category}</span>

                  <span className={servicesCSS.dropdownIcon}>
                    {openCategory === category.category ? "⌃" : "⌄"}
                  </span>
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
                            className={servicesCSS.itemButton}
                          >
                            <span>{item.name}</span>

                            <span className={servicesCSS.dropdownIcon}>
                              {openItem === item.id ? "⌃" : "⌄"}
                            </span>
                          </button>
                          {openItem === item.id && (
                            <div style={{ padding: "10px 0" }}>
                              <p>{item.description}</p>

                              <p style={{ fontWeight: "bold" }}>
                                Starting at ${item.price}
                              </p>

                              <div style={{ marginTop: "1rem" }}>
                                <p style={{ fontWeight: "bold" }}>Size:</p>

                                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                  {item.sizes.map((size) => (
                                    <button
                                      className={
                                        selectedSizes[item.id]?.size === size.size
                                          ? `${servicesCSS.sizeButton} ${servicesCSS.sizeButtonActive}`
                                          : servicesCSS.sizeButton
                                      }
                                      key={size.size}
                                      onClick={() =>
                                        setSelectedSizes({
                                          ...selectedSizes,
                                          [item.id]: size,
                                        })
                                      }
                                    >
                                      {size.size}
                                    </button>
                                  ))}
                                </div>
                                {selectedSizes[item.id] && (
                                  <p style={{ marginTop: "0.75rem", fontWeight: "bold" }}>
                                    Serves {selectedSizes[item.id].serves || "varies"} • $
                                    {selectedSizes[item.id].price}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {item.id === "custom-cake" && (
                            <div style={{ marginTop: "1rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button
                                  onClick={() =>
                                    setCustomStep({
                                      ...customStep,
                                      [item.id]: Math.max((customStep[item.id] || 0) - 1, 0),
                                    })
                                  }
                                >
                                  {"<"}
                                </button>

                                <p style={{ fontWeight: "bold" }}>
                                  {["Size", "Frosting / Filling / Flavor", "Decorations / Add-ons / Notes"][customStep[item.id] || 0]}
                                </p>

                                <button
                                  onClick={() =>
                                    setCustomStep({
                                      ...customStep,
                                      [item.id]: Math.min((customStep[item.id] || 0) + 1, 2),
                                    })
                                  }
                                >
                                  {">"}
                                </button>
                              </div>
                              {item.id === "custom-cake" && (
                                <div style={{ marginTop: "1rem" }}>
                                  {(customStep[item.id] || 0) === 0 && (
                                    <p>Choose your cake size above.</p>
                                  )}

                                  {(customStep[item.id] || 0) === 1 && (
                                    <div>
                                      <p>Frosting / Filling / Flavor options coming soon.</p>
                                    </div>
                                  )}

                                  {(customStep[item.id] || 0) === 2 && (
                                    <div>
                                      <p>Decorations, add-ons, and notes coming soon.</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          <p className={servicesCSS.heroParagraphServices}>
                            {item.description}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <input
                            type="number"
                            min="0"
                            value={
                              quantityInputs[item.id] ??
                              String(cart.find((cartItem) => cartItem.id === item.id)?.quantity ?? "")
                            }
                            onChange={(e) =>
                              setQuantityInputs({
                                ...quantityInputs,
                                [item.id]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const quantity = Number(quantityInputs[item.id] || 0);

                                updateQuantity(
                                  {
                                    id: item.id,
                                    name: selectedSizes[item.id]
                                      ? `${item.name} - ${selectedSizes[item.id].size}`
                                      : item.name,
                                    price: selectedSizes[item.id]?.price || item.price || item.price || 0,
                                    duration: item.duration || 0,
                                    quantity: 1,
                                  },
                                  quantity
                                );

                                setQuantityInputs({
                                  ...quantityInputs,
                                  [item.id]: "",
                                });
                              }
                            }}
                            className={pageCSS.basketMiniInput}
                          />

                          <div
                            onClick={() => {
                              const quantity = Number(quantityInputs[item.id] || 0);

                              updateQuantity(
                                {
                                  id: item.id,
                                  name: selectedSizes[item.id]
                                    ? `${item.name} - ${selectedSizes[item.id].size}`
                                    : item.name,
                                  price: selectedSizes[item.id]?.price || item.price || item.price || 0,
                                  duration: item.duration || 0,
                                  quantity: 1,
                                },
                                quantity
                              )
                            }}
                            className={servicesCSS.addBtn}
                          >
                            Add to Basket
                          </div>
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
             <h2 className={pageCSS.cartTitle}>
                🍰 Your Basket ({cart.reduce((total, item) => total + item.quantity, 0)})
             </h2>
            }

            {exists &&
              <table className={pageCSS.cartTable}>
                <thead>
                  <tr>
                    <th>Treat</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((service, index) => (
                    <tr key={`${service.id}-${index}`}>
                      <td>
                        <p className={pageCSS.serviceName}>{service.name}</p>
                      </td>

                     
                      <td style={{ paddingLeft: "1rem" }}>
                        ${service.price * service.quantity}
                      </td>
                      <td style={{ paddingLeft: "1rem" }}>x{service.quantity}</td>
                      <td>
                        <div className={pageCSS.basketActionGroup}>
                          <input
                            type="number"
                            min="1"
                            value={
                              activeQtyEditor?.id === service.id &&
                              activeQtyEditor.mode === "subtract"
                                ? basketQtyInput
                                : ""
                            }
                            onChange={(e) => setBasketQtyInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                decreaseQuantity(service.id, Number(basketQtyInput || 0));
                                setActiveQtyEditor(null);
                                setBasketQtyInput("");
                              }
                            }}
                            className={`${pageCSS.basketMiniInput} ${
                              activeQtyEditor?.id === service.id &&
                              activeQtyEditor.mode === "subtract"
                                ? ""
                                : pageCSS.hiddenBasketInput
                            }`}
                          />

                          <BiMinusCircle
                            className={pageCSS.removeButton}
                            onClick={() => {
                              if (
                                activeQtyEditor?.id === service.id &&
                                activeQtyEditor.mode === "subtract"
                              ) {
                                setActiveQtyEditor(null);
                              } else {
                                setActiveQtyEditor({ id: service.id, mode: "subtract" });
                              }

                              setBasketQtyInput("");
                            }}
                          />

                          <BiPlusCircle
                            className={pageCSS.addButton}
                            onClick={() => {
                              if (
                                activeQtyEditor?.id === service.id &&
                                activeQtyEditor.mode === "add"
                              ) {
                                setActiveQtyEditor(null);
                              } else {
                                setActiveQtyEditor({ id: service.id, mode: "add" });
                              }

                              setBasketQtyInput("");
                            }}
                          />

                          <input
                            type="number"
                            min="1"
                            value={
                              activeQtyEditor?.id === service.id &&
                              activeQtyEditor.mode === "add"
                                ? basketQtyInput
                                : ""
                            }
                            onChange={(e) => setBasketQtyInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                increaseQuantity(service.id, Number(basketQtyInput || 0));
                                setActiveQtyEditor(null);
                                setBasketQtyInput("");
                              }
                            }}
                            className={`${pageCSS.basketMiniInput} ${
                              activeQtyEditor?.id === service.id &&
                              activeQtyEditor.mode === "add"
                                ? ""
                                : pageCSS.hiddenBasketInput
                            }`}
                          />
                        </div>                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            {exists ?
              <div className={pageCSS.cartSummary}>
                <h3>Total: ${totalPrice}</h3>
              </div>
              :
              <div></div>
            }


            {exists ?

              <div className={pageCSS.checkoutButton}style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>
                <Link href="/services/book" className={pageCSS.bookBtn} style={{ pointerEvents: "auto", color: "#6b3f2a", width: "auto", fontWeight: "bold" }}>
                  Confirm Basket
                </Link>
              </div>

              : <h5 style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>Cart is empty {":("} </h5>
            }


          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Prices are subject to change based on size, flavor, and design for custom orders.
          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            * Please allow 48 hours notice for all orders. Custom orders may require more time based on complexity.
          </div>



        </div>
      </main>
      <BottomSheetNav />

    </div>
  )
}