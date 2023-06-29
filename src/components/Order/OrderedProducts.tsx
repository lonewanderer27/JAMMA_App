import { Card, CardBody, Table, TableContainer, Thead, Tr, Text, Tbody, Td } from "@chakra-ui/react";
import { OrderType, Product } from "../../types/jamma";
import OrderedProduct from ".././Order/OrderedProduct";

export default function OrderedProducts(props: {
  order: OrderType,
  orderedProducts: Product[]
}) {
  return (
    <Card>
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Td>
                <Text>Name</Text>
              </Td>
              <Td>
                <Text>Unit Price</Text>
              </Td>
              <Td>
                <Text>Amount</Text>
              </Td>
              <Td>
                <Text>Item Subtotal</Text>
              </Td>
              <Td>
                <Text>Actions</Text>
              </Td>
            </Thead>
            <Tbody>
              {props.order.products.products.map((product) => {
                const orderedProduct = props.orderedProducts.find((orderedProduct) => orderedProduct.id === product.product_id);
                if (!orderedProduct) {
                  return null;
                }
                return (
                  <OrderedProduct 
                    key={orderedProduct.id} 
                    product={orderedProduct} 
                    quantity={product.quantity}
                  />
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}