"use client";
import BottomSheetNav from "../components/BottomSheetNav";
import pageCSS from "./page.module.css"
import servicesCSS from "./services.module.css"
import { BiMinusCircle, BiPlusCircle, BiChevronLeft, BiChevronRight } from "react-icons/bi";
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
        price:50,
        duration: 0,
        description: "Custom pricing depends on size, flavor, and design.",
        sizes: [
          {
            size: "Basic",
            displaySize: '10" Cake',
            price: 50,
            serves: "18–24",
          },
          {
            size: "Detailed",
            displaySize: '12" Cake',
            price: 100,
            serves: "25–35",
          },
          {
            size: "Premium",
            displaySize: '14" Cake',
            price: 200,
            serves: "35–50",
          },
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
  [key: string]: {
    size: string;
    price: number;
    serves?: string;
    displaySize?: string;
  };
}>({});

const [customOptionPage, setCustomOptionPage] = useState<{ [key: string]: number }>({});
  const exists = cart.length > 0;

  const totalPrice = cart.reduce(
    (total, service) => total + service.price * service.quantity,
    0
  );
  const totalDuration = cart.reduce(
    (total, service) => total + service.duration,
    0
  );

  const customOptionPages = [
  {
    title: "Flavor",
    label: "Choose a flavor",
    options: ["Chocolate", "Vanilla", "Strawberry", "Red Velvet"],
  },
  {
    title: "Filling",
    label: "Choose a filling",
    options: ["None", "Chocolate Ganache", "Vanilla Cream", "Fruit Filling"],
  },
  {
    title: "Frosting",
    label: "Choose frosting",
    options: ["Buttercream", "Chocolate Buttercream", "Vanilla Buttercream", "Cream Cheese"],
  },
  {
    title: "Add-ons",
    label: "Choose add-ons",
    options: ["None", "Writing", "Flowers", "Extra Decoration"],
  },
];

  return (
    <div className="body-wrap boxed-container">
      <main>
        <header className={pageCSS.bakeryHeader}>
          <img
            src="/images/corner-img.png"
            alt=""
            className={pageCSS.flowerBanner}
          />
          {/* <button className={pageCSS.menuButton}>☰ Menu</button> */}

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
            <svg viewBox="0 0 1200 70" preserveAspectRatio="none">
              <path
                className={pageCSS.waveFill}
                d="
                  M0,28
                  Q50,8 100,28
                  T200,28
                  T300,28
                  T400,28
                  T500,28
                  T600,28
                  T700,28
                  T800,28
                  T900,28
                  T1000,28
                  T1100,28
                  T1200,28
                  L1200,70
                  L0,70
                  Z
                "
              />

              <path
                className={pageCSS.waveLine}
                d="
                  M0,28
                  Q50,8 100,28
                  T200,28
                  T300,28
                  T400,28
                  T500,28
                  T600,28
                  T700,28
                  T800,28
                  T900,28
                  T1000,28
                  T1100,28
                  T1200,28
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
                    {openCategory === category.category ? "▴" : "▾"}
                  </span>
                </button>
              {openCategory === category.category && (
                <>
                {category.items.map((item) => {
                  const exists = cart.some((cartItem) => cartItem.id === item.id);
                  const currentSize = selectedSizes[item.id] || item.sizes[0];
                  const currentCustomPage = customOptionPage[item.id] ?? 0;
                  const safeCustomPage = Math.min(
                    Math.max(currentCustomPage, 0),
                    customOptionPages.length - 1
                  );
                  const customPage = customOptionPages[safeCustomPage];

                  return (
                    <div key={item.id} className={servicesCSS.servicesContainer}>
                      <div>
                        <div className={servicesCSS.textContent}>
                          <button
                            onClick={() =>
                              setOpenItem(openItem === item.id ? null : item.id)
                            }
                            className={servicesCSS.itemDropdownBtn}
                          >
                            <span>{item.name}</span>

                            <span className={servicesCSS.itemArrow}>
                              {openItem === item.id ? "▴" : "▾"}
                            </span>
                          </button>

                        {openItem === item.id && (
                          <div className={servicesCSS.productCardGrid}>
                            <div className={servicesCSS.productImagePlaceholder}>
                              🧁
                            </div>

                            <div className={servicesCSS.productDetails}>
                              <p>{item.description}</p>

                              <p style={{ fontWeight: "bold" }}>
                                Starting at ${item.price}
                              </p>

                              <div style={{ marginTop: "1rem" }}>
                               {item.id === "custom-cake" && selectedSizes[item.id] ? (
                                  <p style={{ fontWeight: "bold" }}>
                                    Size: {selectedSizes[item.id].displaySize} • Serves{" "}
                                    {selectedSizes[item.id].serves || "varies"}
                                  </p>
                                ) : (
                                  <p style={{ fontWeight: "bold" }}>Size:</p>
                                )}

                                <div className={servicesCSS.sizeButtonGroup}>
                                  {item.sizes.map((size) => (
                                    <button
                                      className={
                                        currentSize?.size === size.size
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

                              {currentSize && (
                                <p className={servicesCSS.sizeSummary}>
                                  {item.id === "custom-cake" ? (
                                    <>Starting price: ${currentSize.price}</>
                                  ) : (
                                    <>
                                      Serves {currentSize.serves || "varies"} • ${currentSize.price}
                                    </>
                                  )}
                                </p>
                              )}
                              {item.id === "custom-cake" && (
                                <div className={servicesCSS.customPager}>
                                  <div className={servicesCSS.customPagerHeader}>
                                    {safeCustomPage > 0 ? (
                                      <button
                                        type="button"
                                        className={servicesCSS.customArrowButton}
                                        onClick={() =>
                                          setCustomOptionPage({
                                            ...customOptionPage,
                                            [item.id]: safeCustomPage - 1,
                                          })
                                        }
                                      >
                                        <BiChevronLeft className={servicesCSS.customArrowIcon} />
                                      </button>
                                    ) : (
                                      <span className={servicesCSS.customArrowSpacer}></span>
                                    )}

                                    <p className={servicesCSS.customPagerTitle}>{customPage.title}</p>

                                    {safeCustomPage < customOptionPages.length - 1 ? (
                                      <button
                                        type="button"
                                        className={servicesCSS.customArrowButton}
                                        onClick={() =>
                                          setCustomOptionPage({
                                            ...customOptionPage,
                                            [item.id]: safeCustomPage + 1,
                                          })
                                        }
                                      >
                                        <BiChevronRight className={servicesCSS.customArrowIcon} />
                                      </button>
                                    ) : (
                                      <span className={servicesCSS.customArrowSpacer}></span>
                                    )}
                                  </div>

                                  <div className={servicesCSS.customOptionCard}>
                                    <label className={servicesCSS.optionLabel}>{customPage.label}</label>

                                    <select className={servicesCSS.optionSelect}>
                                      {customPage.options.map((option) => (
                                        <option key={option}>{option}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              )}
                              </div>
                            </div>
                          </div>
                        )}

                          
                        </div>
                     {openItem === item.id && (
                      <div className={servicesCSS.orderActionRow}>
                        <div className={servicesCSS.quantityControl}>
                          <button
                            type="button"
                            className={servicesCSS.qtyButton}
                            onClick={() => {
                              const currentQty = Number(quantityInputs[item.id] || 1);

                              setQuantityInputs({
                                ...quantityInputs,
                                [item.id]: String(Math.max(currentQty - 1, 0)),
                              });
                            }}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            min="0"
                            value={quantityInputs[item.id] ?? "1"}
                            onChange={(e) =>
                              setQuantityInputs({
                                ...quantityInputs,
                                [item.id]: e.target.value,
                              })
                            }
                            className={servicesCSS.qtyInput}
                          />

                          <button
                            type="button"
                            className={servicesCSS.qtyButton}
                            onClick={() => {
                              const currentQty = Number(quantityInputs[item.id] || 1);

                              setQuantityInputs({
                                ...quantityInputs,
                                [item.id]: String(currentQty + 1),
                              });
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div
                          onClick={() => {
                            const quantity = Number(quantityInputs[item.id] || 1);

                            updateQuantity(
                              {
                                id: item.id,
                                name: currentSize
                                  ? `${item.name} - ${currentSize.size}`
                                  : item.name,
                                price: currentSize?.price ?? item.price ?? 0,
                                duration: item.duration || 0,
                                quantity: 1,
                              },
                              quantity > 0 ? quantity : 1
                            );
                          }}
                          className={servicesCSS.orderAddButton}
                        >
                          Add to Basket
                        </div>
                      </div>
                    )}
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

              <div className={pageCSS.checkoutButton}>
                <Link href="/services/book" className={pageCSS.bookBtn}>
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