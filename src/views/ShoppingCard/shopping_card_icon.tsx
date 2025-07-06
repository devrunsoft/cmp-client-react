import React, { useEffect } from 'react';
import { IoBasketOutline } from 'react-icons/io5';
import styles from './shoppingCard.module.css';
import { useCard } from 'components/context_api/shopping_card_context';
import { APP_ROUTES } from '../../routes/app_route';
import { useNavigate } from 'react-router-dom';
import { Logout, ShoppingBag, ShoppingCart } from "@mui/icons-material";

const ShoppingCardIcon = () => {
    var { itemsCard } = useCard();
    const navigate = useNavigate();

    useEffect(() => {
    }, [itemsCard]);

    return (
        <div className={styles.iconContainer} onClick={() => navigate(APP_ROUTES.ShoppingCard,{replace : true})}>
            <ShoppingCart sx={{ color: "white" }} />
            {itemsCard.length > 0 && (
                <span className={styles.badge}>{itemsCard.length}</span>
            )}
        </div>
    );
};

export default ShoppingCardIcon;
