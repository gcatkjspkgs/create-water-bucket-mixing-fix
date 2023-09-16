ServerEvents.recipes((event) => {
    // Loop through every shapeless water bucket recipe
    event.forEachRecipe({ input: 'minecraft:water_bucket', type: 'minecraft:crafting_shapeless' }, (recipe) => {
        // Blacklist mixing recipes that are already in Create
        if (recipe.getOriginalRecipeResult() === 'create:dough' || recipe.getOriginalRecipeResult() === 'create:wheat_dough') return;

        // Get existing recipe ingredients, other than the water bucket
        const new_ingredients = [];
        recipe.getOriginalRecipeIngredients().forEach((ingredient) => {
            ingredient.stacks.forEach((recipe_item) => {
                if (recipe_item === '1 water_bucket') return;
                new_ingredients.push(recipe_item);
            });
        });

        // Replace the water bucket with water fluid!
        new_ingredients.push(Fluid.of('minecraft:water', 1000));

        // Add the old recipe's ingredients to a new mixing recipe
        recipe.id(`${recipe.getId()}_manual_only`);
        event.recipes.createMixing(
            recipe.getOriginalRecipeResult(),
            new_ingredients,
        );
    });
}
