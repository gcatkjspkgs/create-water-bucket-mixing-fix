ServerEvents.recipes((event) => {
    event.forEachRecipe({ input: 'minecraft:water_bucket', type: 'minecraft:crafting_shapeless' }, (recipe) => {
        // Loop through every shapeless water bucket recipe and get its other ingredients.
        const new_ingredients = [];
        recipe.getOriginalRecipeIngredients().forEach((ingredient) => {
            ingredient.stacks.forEach((recipe_item) => {
                if (recipe_item === '1 water_bucket') return;
                new_ingredients.push(recipe_item);
            });
        });

        // Replace the water bucket with water fluid!
        new_ingredients.push(Fluid.of('minecraft:water', 1000));

        // Blacklist mixing recipes that are already in Create
        if (recipe.result === 'create:dough' || recipe.result === 'create:wheat_dough') return;

        // Add the old recipe's ingredients to a new mixing recipe
        recipe.id(`${recipe.getId()}_manual_only`);
        event.recipes.createMixing(
            recipe.result,
            new_ingredients,
        );
    });
})