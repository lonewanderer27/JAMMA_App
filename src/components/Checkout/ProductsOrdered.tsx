import { Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Image, Checkbox } from "@chakra-ui/react";
import ProductItemList from "./ProductListItem";
import { checkoutItemsAtom } from "../../atoms/checkout";
import { useRecoilValue } from "recoil";
import ListUl from "bootstrap-icons/icons/list-ul.svg"
import CartCheckFill from "bootstrap-icons/icons/cart-check-fill.svg"
import { useLocation } from "react-router-dom";

export default function ProductsOrdered() {
  const { pathname } = useLocation();
  const { checkoutProducts, totalCount, totalPriceFormatted } = useRecoilValue(checkoutItemsAtom);

  return (
    <Card>
      <CardHeader display="flex" alignItems="center" paddingBottom={0}>
        <Image src={CartCheckFill} boxSize="1.5rem" mr={2} />
        <Heading size="md">Products Ordered</Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                {pathname.includes("cart") &&
                <Th>
                  <Checkbox/>
                </Th>}
                <Th>
                  <Text>
                    Name
                  </Text>
                </Th>
                <Th>
                  <Text>Unit Price</Text>
                </Th>
                <Th>
                  <Text>Amount</Text>
                </Th>
                <Th>
                  <Text>Item Subtotal</Text>
                </Th>
                {pathname.includes("cart") &&
                <Th>
                  <Text>
                    Actions
                  </Text>
                </Th>}
              </Tr>
            </Thead>
            <Tbody>
              {checkoutProducts.map((product) => (
                <ProductItemList key={product.id} {...product} />
              ))}
              <Th colSpan={3} textAlign={'end'}>
                <Text>
                  Order Total: {totalCount}
                </Text>
              </Th>
              <Th colSpan={1}>
                <Text>
                  {totalPriceFormatted}
                </Text>
              </Th>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}