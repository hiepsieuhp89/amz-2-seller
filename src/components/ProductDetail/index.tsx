"use client"

import type React from "react"
import { useState } from "react"
import { Row, Col, Typography, Rate, Button, InputNumber, Divider, Card } from "antd"
import { motion } from "framer-motion"
import Icon from "@mdi/react"
import {
  mdiHeart,
  mdiCompare,
  mdiMinus,
  mdiPlus,
  mdiCartOutline,
  mdiCartArrowRight,
  mdiEmailOutline,
  mdiTwitter,
  mdiFacebook,
  mdiLinkedin,
  mdiWhatsapp,
  mdiCheckCircle,
} from "@mdi/js"
import Image from "next/image"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const { Title, Text } = Typography

// Product images
const productImages = [
  "https://m.media-amazon.com/images/I/51FANKJajxL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/41oWqbjbYQL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/41mUAj5oWCL._AC_SL1500_.jpg",
]

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1)
  const [currentImage, setCurrentImage] = useState<number>(0)
  const price = 9.99
  const totalPrice = price * quantity
  const availableQuantity = 8641

  // Animation variants
  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  return (
      <div className="py-6 px-[104px]">
          <Row gutter={[32, 24]}>
            {/* Product Image Gallery */}
            <Col xs={24} lg={10} xl={10}>
              <div className="product-gallery" style={{ position: "sticky", top: "20px" }}>
                <Zoom>
                  <Image
                    src={productImages[currentImage]}
                    alt="Product"
                    width={800}
                    height={600}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                      borderRadius: "4px",
                      cursor: "zoom-in"
                    }}
                  />
                </Zoom>

                <Row className="thumbnail-gallery" gutter={[8, 8]} style={{ marginTop: "16px" }}>
                  {productImages.map((img, index) => (
                    <Col span={8} key={index}>
                      <motion.div
                        whileHover={imageVariants.hover}
                        whileTap={imageVariants.tap}
                        onClick={() => setCurrentImage(index)}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          width={120}
                          height={60}
                          style={{
                            width: "100%",
                            height: "60px",
                            objectFit: "cover",
                            cursor: "pointer",
                            border: currentImage === index ? "2px solid #1890ff" : "1px solid #d9d9d9",
                            padding: "2px",
                            borderRadius: "2px",
                          }}
                        />
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* Product Details */}
            <Col xs={24} lg={14} xl={14}>
              <div className="product-info">
                <Title level={4} style={{ fontWeight: 700, marginBottom: "16px" }}>
                  Hyhucoie Womens Sweatsuits 2 Piece Set Lounge Sets Long Sleeve Tops Jogger Sweatpants Track Sweats
                  Suits Matching Pants Sets - Clothes
                </Title>

                <Row align="middle" gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                  <Col>
                    <Rate disabled defaultValue={5} style={{ fontSize: "16px" }} />
                    <Text type="secondary" style={{ marginLeft: "8px", fontSize: "14px" }}>
                      (0 Nhận xét)
                    </Text>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                      Dự kiến thời gian ship: <Text strong>3 ngày</Text>
                    </Text>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "16px" }}>
                  <Col>
                    <Button
                      type="text"
                      icon={<Icon path={mdiHeart} size={0.8} />}
                      style={{ padding: "0", marginRight: "16px" }}
                    >
                      <Text style={{ marginLeft: "4px", opacity: 0.7 }}>Thêm vào danh sách yêu thích</Text>
                    </Button>
                    <Button type="text" icon={<Icon path={mdiCompare} size={0.8} />} style={{ padding: "0" }}>
                      <Text style={{ marginLeft: "4px", opacity: 0.7 }}>Thêm vào để so sánh</Text>
                    </Button>
                  </Col>
                </Row>

                <Divider style={{ margin: "16px 0" }} />

                <Row style={{ marginBottom: "16px" }}>
                  <Col span={6}>
                    <Text type="secondary">Được bán bởi</Text>
                  </Col>
                  <Col span={18}>
                    <Text strong>Shop Hoa Hong</Text>
                  </Col>
                </Row>

                <Divider style={{ margin: "16px 0" }} />

                <Row style={{ marginBottom: "16px" }}>
                  <Col span={6}>
                    <Text type="secondary">Giá bán</Text>
                  </Col>
                  <Col span={18}>
                    <Text style={{ fontSize: "18px", fontWeight: 700, color: "#ff4d4f" }}>${price.toFixed(2)}</Text>
                    <Text type="secondary" style={{ marginLeft: "4px" }}>
                      /pc
                    </Text>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "16px" }}>
                  <Col span={6}>
                    <Text type="secondary">Định lượng</Text>
                  </Col>
                  <Col span={18}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #d9d9d9",
                          borderRadius: "2px",
                          marginRight: "16px",
                        }}
                      >
                        <motion.button
                          whileHover={buttonVariants.hover}
                          whileTap={buttonVariants.tap}
                          style={{
                            border: "none",
                            background: "#f5f5f5",
                            padding: "4px 12px",
                            cursor: quantity > 1 ? "pointer" : "not-allowed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                          disabled={quantity <= 1}
                        >
                          <Icon path={mdiMinus} size={0.8} />
                        </motion.button>
                        <InputNumber
                          min={1}
                          max={availableQuantity}
                          value={quantity}
                          onChange={(value) => setQuantity(Number(value))}
                          style={{
                            width: "60px",
                            border: "none",
                            borderLeft: "1px solid #d9d9d9",
                            borderRight: "1px solid #d9d9d9",
                          }}
                          controls={false}
                        />
                        <motion.button
                          whileHover={buttonVariants.hover}
                          whileTap={buttonVariants.tap}
                          style={{
                            border: "none",
                            background: "#f5f5f5",
                            padding: "4px 12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => setQuantity((prev) => Math.min(availableQuantity, prev + 1))}
                        >
                          <Icon path={mdiPlus} size={0.8} />
                        </motion.button>
                      </div>
                      <Text type="secondary">({availableQuantity} có sẵn)</Text>
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "24px" }}>
                  <Col span={6}>
                    <Text type="secondary">Tổng giá</Text>
                  </Col>
                  <Col span={18}>
                    <Text style={{ fontSize: "20px", fontWeight: 700, color: "#ff4d4f" }}>
                      ${totalPrice.toFixed(2)}
                    </Text>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: "24px" }}>
                  <Col>
                    <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<Icon path={mdiCartOutline} size={0.8} />}
                        style={{
                          backgroundColor: "#52c41a",
                          borderColor: "#52c41a",
                          minWidth: "150px",
                          borderRadius: "0",
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </motion.div>
                  </Col>
                  <Col>
                    <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<Icon path={mdiCartArrowRight} size={0.8} />}
                        style={{
                          minWidth: "150px",
                          borderRadius: "0",
                        }}
                      >
                        Mua ngay
                      </Button>
                    </motion.div>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "16px" }}>
                  <Col span={6}>
                    <Text type="secondary">Hoàn tiền</Text>
                  </Col>
                  <Col span={18}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* <img src="" alt="Refund Policy" style={{ height: "36px" }} /> */}
                      <a href="#" style={{ marginLeft: "12px", color: "#1890ff" }}>
                        View Policy
                      </a>
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: "24px" }}>
                  <Col span={6}>
                    <Text type="secondary">Chia sẻ</Text>
                  </Col>
                  <Col span={18}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<Icon path={mdiEmailOutline} size={0.8} />}
                          style={{ color: "#595959" }}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<Icon path={mdiTwitter} size={0.8} />}
                          style={{ color: "#1DA1F2" }}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<Icon path={mdiFacebook} size={0.8} />}
                          style={{ color: "#4267B2" }}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<Icon path={mdiLinkedin} size={0.8} />}
                          style={{ color: "#0077B5" }}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<Icon path={mdiWhatsapp} size={0.8} />}
                          style={{ color: "#25D366" }}
                        />
                      </motion.div>
                    </div>
                  </Col>
                </Row>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{
                    marginTop: "24px",
                    padding: "12px",
                    backgroundColor: "#f6ffed",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon path={mdiCheckCircle} size={1} color="#52c41a" style={{ marginRight: "8px" }} />
                  <div>
                    <Text strong>Hoàn tiền đảm bảo</Text>
                    <Text style={{ display: "block" }}>30 Days Cash Back Guarantee</Text>
                  </div>
                  <a href="#" style={{ marginLeft: "auto", color: "#1890ff" }}>
                    View Policy
                  </a>
                </motion.div>
              </div>
            </Col>
          </Row>
      </div>
  )
}

export default ProductDetail

