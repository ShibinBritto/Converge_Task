describe('Amazon Assessment by Converge point',()=>{
    let testdata;
    before(()=>{
        cy.fixture('amz').then((tdata)=>{
            testdata=tdata;
        })
    })
    beforeEach(()=>{
        cy.visit('/')
    })
    it('Perform Expected Tasks',()=>{
        cy.title().should('include',testdata.titleAmz)
        cy.selectExpectedfromCategory('Fashion')
        cy.get('img[alt*="Men"]').click()
        cy.get('ul[class="a-unordered-list a-nostyle a-vertical a-spacing-medium"] li div[aria-label="4 Stars & Up"]').should('be.visible').click()
        cy.wait(2000); 
        const sliderMin = 100;
        const sliderMax = 1000;
        const lowerBoundValue = 43.6; 
        const upperBoundValue = 100; 
        const lowerBoundPercentage = (lowerBoundValue - sliderMin) / (sliderMax - sliderMin);
        const upperBoundPercentage = (upperBoundValue - sliderMin) / (sliderMax - sliderMin);
        cy.get('#p_36\\2Frange-slider_slider-item_lower-bound-slider').then(($lowerSlider) => {
        cy.wrap($lowerSlider).invoke('css', 'pointer-events', 'auto');
        cy.wrap($lowerSlider).invoke('val', lowerBoundValue).trigger('input', { force: true }).trigger('change', { force: true });
        cy.wrap($lowerSlider).invoke('css', 'pointer-events', 'none');
        });
        cy.get('#p_36\\2Frange-slider_slider-item_upper-bound-slider').then(($upperSlider) => {
        cy.wrap($upperSlider).invoke('css', 'pointer-events', 'auto');
        cy.wrap($upperSlider).invoke('val', upperBoundValue).trigger('input', { force: true }).trigger('change', { force: true });
        cy.wrap($upperSlider).invoke('css', 'pointer-events', 'none');
        });
        cy.get('input[aria-label="Go - Submit price range"]').should('be.visible').click({ force: true });
        cy.get('#brandsRefinements li').each(($brands)=>{
            if($brands.text().includes('Allen')){
                cy.wrap($brands).find('input[type="checkbox"]').check({force: true})
            }
        })
        cy.wait(5000)
        cy.get('[class*="puis-card-container"]').then(($items)=>{
            const itemCount=$items.length;
            cy.log(`Total items available visible after selecting "Allen Solly is ${itemCount}"`)
        })
        cy.screenshot()
        cy.get('[class*="puis-card-container"] [data-component-type="s-product-image"] a').eq(1).invoke('removeAttr','target').click()
        cy.wait(20000)
        cy.get('#add-to-cart-button').click()
        cy.wait(2000)
        cy.get('#nav-cart').should('be.visible')
        cy.get('#nav-cart-count-container span:nth-child(1)').should('contain','1')

     });
   });
