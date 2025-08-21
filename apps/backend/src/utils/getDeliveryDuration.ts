import {weightedChoice} from "@/utils/weightedChoice";
import {getPseudoRandomFloat} from "@/utils/getPseudoRandomFloat";

export const getDeliveryDuration = (product, profile) => {
    const seed = getPseudoRandomFloat(product.id);
    return weightedChoice(profile.dayWeight, seed);
}