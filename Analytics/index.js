import Home from "./components/Home";
import { Shelf } from "./components/Shelf";
import { CloudWords } from "./components/CloudWords";
import { MainMenu } from "./components/MainMenu";
import { Header } from "./components/Header";
import { Department } from "./components/Department";
import { Product } from "./components/Product";
import { Minicart } from "./components/Minicart";
import SocialCommerce from './components/SocialCommerce'

const Analytics = () => {
  try {
    window.addEventListener("load", () => {
      if ("ga" in window) {
        const tracker = ga.getAll()?.[0];

        if (tracker) {
          document.addEventListener("click", (e) => {
            const target = e.target;

            Home(tracker, target);
            SocialCommerce(tracker, target);
            Shelf(tracker, target);
            CloudWords(tracker, target);
            Header(tracker, target);
            MainMenu(tracker, target);
            Department(tracker, target);
            Product(tracker, target);
          });

          if (document.body.id === 'product-page') {
            const productId = window.skuJson.productId;

            const sectionInfo = document.querySelector('.section_info');

            const brand = sectionInfo.querySelector('.brandName')?.textContent;
            const [_, ...categories] = sectionInfo.querySelectorAll('.bread-crumb span');
            const sellerName = sectionInfo.querySelector('.seller-name > a')?.textContent;
            const listPrice = sectionInfo.querySelector('.skuListPrice')?.textContent;
            const bestPrice = sectionInfo.querySelector('.skuBestPrice')?.textContent;

            const categoriesNames = categories.map(categorie => categorie.textContent.toLowerCase()).join('/')

            const result = [productId, brand, categoriesNames, sellerName, listPrice, bestPrice].filter(value => !!value);

            tracker.send("event", "pageView", "Product", result.join(' - '));
          }
        }

        Minicart('PRODUCT_PAGE')
      }
    });
  } catch (e) {
    console.error(`[Analytics] `, e);
  }
};

export default Analytics;
