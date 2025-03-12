import { test, expect } from '@playwright/test';

test.describe('קבוצה חדשה', () => {
  test('יצירת קבוצה חדשה', async ({ page }) => {
    // נכנס לדף הקבוצות
    await page.goto('/');
    await page.click('a[href="/groups"]');
    
    // בדיקה שאנחנו בדף הקבוצות
    await expect(page.locator('h1')).toHaveText('הקבוצות שלי');
    await expect(page.locator('p')).toContainText('עדיין אין לך קבוצות');
    
    // לחיצה על כפתור להוספת קבוצה חדשה
    await page.locator('button.add-button').click();
    
    // בדיקה שהועברנו לדף יצירת קבוצה
    await expect(page).toHaveURL(/.*\/create\/group/);
    await expect(page.locator('h1')).toHaveText('צור קבוצה חדשה');
    
    // מילוי פרטי הקבוצה החדשה
    await page.locator('input[id="name"]').fill('קבוצת בדיקה');
    await page.locator('input[id="description"]').fill('תיאור קבוצת בדיקה');
    
    // בחירת סוג הקבוצה
    await page.click('[aria-label="סוג קבוצה"]');
    await page.click('text=חברים');
    
    // שליחת הטופס
    await page.click('button[type="submit"]');
    
    // בדיקה שהקבוצה נוצרה בהצלחה
    await expect(page.locator('p.text-xl')).toHaveText('הקבוצה נוצרה בהצלחה!');
    
    // בדיקה שהאייקון של הצלחה מוצג
    await expect(page.locator('i.fa.fa-check-circle')).toBeVisible();
  });
  
  test('וידוא שגיאות תקינות בטופס יצירת קבוצה', async ({ page }) => {
    // נכנס ישירות לדף יצירת קבוצה
    await page.goto('/create/group');
    
    // בדיקה שהטופס מוצג
    await expect(page.locator('form')).toBeVisible();
    
    // ניסיון לשלוח טופס ריק
    await page.click('button[type="submit"]');
    
    // בדיקה שמופיעה שגיאת ולידציה עבור שדה חובה
    await expect(page.locator('#name ~ .error-message')).toBeVisible();
    await expect(page.locator('#name ~ .error-message')).toContainText('שדה זה הוא חובה');
    
    // מילוי שם קבוצה בלבד ושליחת הטופס
    await page.locator('input[id="name"]').fill('קבוצת בדיקה');
    await page.click('button[type="submit"]');
    
    // בדיקה שהטופס נשלח בהצלחה גם ללא תיאור (שדה לא חובה)
    await expect(page.locator('p.text-xl')).toHaveText('הקבוצה נוצרה בהצלחה!', { timeout: 5000 });
  });
});
