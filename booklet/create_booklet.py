"""
The $10,000 Secret Most Sellers Never Hear
PDF Booklet for Duane Enns — Coldwell Banker Preferred Real Estate
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus.flowables import Flowable
import os

# ─── Colors ───
NAVY = HexColor("#002349")
NAVY_LIGHT = HexColor("#003366")
GOLD = HexColor("#c5a46d")
GOLD_LIGHT = HexColor("#d4b87e")
CREAM = HexColor("#f8f6f2")
WHITE = HexColor("#ffffff")
INK = HexColor("#1a1a2e")
GRAY = HexColor("#5a6070")
LIGHT_GRAY = HexColor("#e8edf4")

# ─── Custom Flowables ───
class GoldRule(Flowable):
    """A thin gold horizontal rule."""
    def __init__(self, width=2*inch, thickness=1.5):
        super().__init__()
        self.width = width
        self.height = thickness + 6
        self.thickness = thickness

    def draw(self):
        self.canv.setStrokeColor(GOLD)
        self.canv.setLineWidth(self.thickness)
        x_start = (self.canv._pagesize[0] - self.width) / 2 - 72  # center
        self.canv.line(0, 3, self.width, 3)


class NumberCircle(Flowable):
    """A navy circle with a gold number inside."""
    def __init__(self, number, size=36):
        super().__init__()
        self.number = str(number)
        self.size = size
        self.width = size
        self.height = size

    def draw(self):
        r = self.size / 2
        self.canv.setFillColor(NAVY)
        self.canv.circle(r, r, r, fill=1, stroke=0)
        self.canv.setFillColor(GOLD)
        self.canv.setFont("Helvetica-Bold", 16)
        self.canv.drawCentredString(r, r - 5, self.number)


class TipBox(Flowable):
    """A styled tip/callout box."""
    def __init__(self, text, width=None):
        super().__init__()
        self.text = text
        self._width = width or 5.5*inch
        self.height = 0

    def wrap(self, availWidth, availHeight):
        self._width = min(self._width, availWidth)
        style = ParagraphStyle('tip_inner', fontName='Helvetica-Oblique',
                               fontSize=10, leading=14, textColor=NAVY)
        self._para = Paragraph(self.text, style)
        w, h = self._para.wrap(self._width - 48, availHeight)
        self.height = h + 28
        return self._width, self.height

    def draw(self):
        self.canv.setFillColor(HexColor("#f0ebe3"))
        self.canv.roundRect(0, 0, self._width, self.height, 8, fill=1, stroke=0)
        self.canv.setStrokeColor(GOLD)
        self.canv.setLineWidth(2)
        self.canv.line(14, 8, 14, self.height - 8)
        self._para.drawOn(self.canv, 28, 10)


# ─── Styles ───
def make_styles():
    s = {}
    s['title'] = ParagraphStyle(
        'Title', fontName='Helvetica-Bold', fontSize=28, leading=34,
        textColor=NAVY, alignment=TA_CENTER, spaceAfter=6
    )
    s['subtitle'] = ParagraphStyle(
        'Subtitle', fontName='Helvetica', fontSize=13, leading=18,
        textColor=GRAY, alignment=TA_CENTER, spaceAfter=24
    )
    s['author'] = ParagraphStyle(
        'Author', fontName='Helvetica', fontSize=11, leading=16,
        textColor=GOLD, alignment=TA_CENTER, spaceAfter=4
    )
    s['h1'] = ParagraphStyle(
        'H1', fontName='Helvetica-Bold', fontSize=22, leading=28,
        textColor=NAVY, spaceBefore=12, spaceAfter=8
    )
    s['h2'] = ParagraphStyle(
        'H2', fontName='Helvetica-Bold', fontSize=16, leading=22,
        textColor=NAVY, spaceBefore=16, spaceAfter=6
    )
    s['h3'] = ParagraphStyle(
        'H3', fontName='Helvetica-Bold', fontSize=13, leading=18,
        textColor=NAVY_LIGHT, spaceBefore=12, spaceAfter=4
    )
    s['body'] = ParagraphStyle(
        'Body', fontName='Helvetica', fontSize=11, leading=17,
        textColor=INK, alignment=TA_JUSTIFY, spaceAfter=8
    )
    s['body_center'] = ParagraphStyle(
        'BodyCenter', fontName='Helvetica', fontSize=11, leading=17,
        textColor=INK, alignment=TA_CENTER, spaceAfter=8
    )
    s['bullet'] = ParagraphStyle(
        'Bullet', fontName='Helvetica', fontSize=11, leading=17,
        textColor=INK, leftIndent=24, bulletIndent=8, spaceAfter=4
    )
    s['gold_bullet'] = ParagraphStyle(
        'GoldBullet', fontName='Helvetica', fontSize=11, leading=17,
        textColor=INK, leftIndent=24, bulletIndent=8, spaceAfter=4,
        bulletColor=GOLD
    )
    s['quote'] = ParagraphStyle(
        'Quote', fontName='Helvetica-Oblique', fontSize=12, leading=18,
        textColor=NAVY, alignment=TA_CENTER, spaceBefore=8, spaceAfter=8,
        leftIndent=36, rightIndent=36
    )
    s['small'] = ParagraphStyle(
        'Small', fontName='Helvetica', fontSize=9, leading=13,
        textColor=GRAY, alignment=TA_CENTER, spaceAfter=4
    )
    s['label'] = ParagraphStyle(
        'Label', fontName='Helvetica-Bold', fontSize=9, leading=13,
        textColor=GOLD, alignment=TA_CENTER, spaceAfter=4,
    )
    s['footer'] = ParagraphStyle(
        'Footer', fontName='Helvetica', fontSize=8, leading=12,
        textColor=GRAY, alignment=TA_CENTER
    )
    s['cta_heading'] = ParagraphStyle(
        'CTAHeading', fontName='Helvetica-Bold', fontSize=18, leading=24,
        textColor=WHITE, alignment=TA_CENTER, spaceAfter=8
    )
    s['cta_body'] = ParagraphStyle(
        'CTABody', fontName='Helvetica', fontSize=11, leading=17,
        textColor=HexColor("#b0c4de"), alignment=TA_CENTER, spaceAfter=6
    )
    s['cta_contact'] = ParagraphStyle(
        'CTAContact', fontName='Helvetica-Bold', fontSize=13, leading=18,
        textColor=GOLD, alignment=TA_CENTER, spaceAfter=4
    )
    return s


# ─── Page Templates ───
def cover_page_bg(canvas, doc):
    """Draw the cover page background."""
    w, h = letter
    # Navy background
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    # Gold accent circle top right
    canvas.setFillColor(HexColor("#002d5c"))
    canvas.circle(w + 40, h - 40, 300, fill=1, stroke=0)
    # Subtle gold glow bottom left
    canvas.setFillColor(HexColor("#001d3d"))
    canvas.circle(-80, 80, 250, fill=1, stroke=0)


def interior_page_bg(canvas, doc):
    """Draw interior page header/footer."""
    w, h = letter
    # Top gold line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.5)
    canvas.line(72, h - 50, w - 72, h - 50)
    # Header text
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(72, h - 44, "The $10,000 Secret Most Sellers Never Hear")
    canvas.drawRightString(w - 72, h - 44, "Duane Enns | Coldwell Banker")
    # Bottom gold line
    canvas.line(72, 50, w - 72, 50)
    # Page number
    canvas.setFillColor(GOLD)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(w / 2, 36, f"- {doc.page} -")


def cta_page_bg(canvas, doc):
    """Draw the CTA page background."""
    w, h = letter
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    canvas.setFillColor(HexColor("#002d5c"))
    canvas.circle(w - 100, h - 100, 200, fill=1, stroke=0)


# ─── Build the booklet ───
def build_booklet():
    output_path = os.path.join(os.path.dirname(__file__), "The-10000-Secret.pdf")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        topMargin=72,
        bottomMargin=72,
        leftMargin=72,
        rightMargin=72,
    )

    s = make_styles()
    story = []

    # ═══════════════════════════════════════
    # COVER PAGE
    # ═══════════════════════════════════════
    story.append(Spacer(1, 2.2 * inch))
    story.append(Paragraph(
        '<font color="#c5a46d">COLDWELL BANKER PREFERRED REAL ESTATE</font>',
        ParagraphStyle('cover_label', fontName='Helvetica', fontSize=9,
                       leading=13, textColor=GOLD, alignment=TA_CENTER,
                       spaceAfter=20, letterSpacing=3)
    ))
    story.append(GoldRule(width=1.5*inch))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        '<font color="#ffffff">The $10,000 Secret</font>',
        ParagraphStyle('cover_title', fontName='Helvetica-Bold', fontSize=36,
                       leading=42, textColor=WHITE, alignment=TA_CENTER,
                       spaceAfter=4)
    ))
    story.append(Paragraph(
        '<font color="#ffffff">Most Sellers Never Hear</font>',
        ParagraphStyle('cover_title2', fontName='Helvetica-Bold', fontSize=36,
                       leading=42, textColor=WHITE, alignment=TA_CENTER,
                       spaceAfter=16)
    ))
    story.append(Paragraph(
        '<font color="#b0c4de">The simple things smart sellers do before listing<br/>'
        'that add real money to their home sale.</font>',
        ParagraphStyle('cover_sub', fontName='Helvetica', fontSize=13,
                       leading=19, textColor=HexColor("#b0c4de"),
                       alignment=TA_CENTER, spaceAfter=30)
    ))
    story.append(GoldRule(width=1.5*inch))
    story.append(Spacer(1, 16))
    story.append(Paragraph(
        '<font color="#c5a46d">By Duane Enns, REALTOR\u00ae</font>',
        ParagraphStyle('cover_author', fontName='Helvetica', fontSize=12,
                       leading=16, textColor=GOLD, alignment=TA_CENTER,
                       spaceAfter=4)
    ))
    story.append(Paragraph(
        '<font color="#8a9ab5">with Jackie Enns</font>',
        ParagraphStyle('cover_author2', fontName='Helvetica', fontSize=10,
                       leading=14, textColor=HexColor("#8a9ab5"),
                       alignment=TA_CENTER)
    ))

    # Switch to cover background
    story.append(PageBreak())

    # ═══════════════════════════════════════
    # WELCOME PAGE
    # ═══════════════════════════════════════
    story.append(Spacer(1, 8))
    story.append(Paragraph("Welcome", s['h1']))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Hey there \u2014 thanks for grabbing this guide!",
        s['body']
    ))
    story.append(Paragraph(
        "My name is Duane Enns. I sell homes in southern Manitoba. "
        "But before that, I built them. For 12 years, my wife Jackie and I "
        "built custom homes from the ground up. I know every beam, every pipe, "
        "every wall. And Jackie? She has a gift for making a house feel like "
        "a home. She has done decor and design for over 20 years.",
        s['body']
    ))
    story.append(Paragraph(
        "This guide is going to show you the simple things that "
        "add real money to your home sale. Not big, scary renos. "
        "Not $50,000 kitchen gut-jobs. Just the smart, easy stuff "
        "that makes buyers say <b>\"I want this one.\"</b>",
        s['body']
    ))
    story.append(Paragraph(
        "Most of these things cost under $500. Some cost nothing at all. "
        "But together, they can add <b>$10,000 or more</b> to your sale price.",
        s['body']
    ))
    story.append(Paragraph(
        "So grab a coffee and let\u2019s get into it.",
        s['body']
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "\u2014 Duane",
        ParagraphStyle('sig', fontName='Helvetica-Oblique', fontSize=12,
                       textColor=NAVY, spaceAfter=8)
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════
    # CHAPTER 1: WHAT TO FIX AND WHAT TO LEAVE
    # ═══════════════════════════════════════
    story.append(Paragraph("Chapter 1", s['label']))
    story.append(Paragraph("What to Fix (and What to Leave Alone)", s['h1']))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "This is the number one question I get: <b>\"What should I fix before I list?\"</b>",
        s['body']
    ))
    story.append(Paragraph(
        "And the answer is simpler than you think. You don\u2019t need to tear "
        "your house apart. You just need to fix the things that catch the eye.",
        s['body']
    ))

    # OUTSIDE
    story.append(Paragraph("Start Outside", s['h2']))
    story.append(Paragraph(
        "When a buyer drives up, they see your home in about 3 seconds. "
        "That first look matters more than you think. Here\u2019s what to check:",
        s['body']
    ))

    outside_items = [
        "<b>The yard</b> \u2014 Pick up the clutter. Bikes, toys, hoses. "
        "Just tidy it up. This one is free.",
        "<b>Shingles</b> \u2014 If they\u2019re in bad shape, talk to your agent. "
        "Sometimes you fix them, sometimes you just price for it.",
        "<b>Siding and paint</b> \u2014 Is it cracked or peeling? A little touch-up "
        "goes a long way.",
        "<b>Windows</b> \u2014 Can you see cracks or fogged-up seals from outside? "
        "Buyers notice.",
        "<b>Downspouts</b> \u2014 If they\u2019re bent or busted, just take them off. "
        "New ones cost almost nothing.",
    ]
    for item in outside_items:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2022'))

    # INSIDE
    story.append(Paragraph("Then Walk Inside", s['h2']))
    inside_items = [
        "<b>Drywall holes and dings</b> \u2014 Patch them. A tub of filler and "
        "some matching paint is all you need.",
        "<b>Paint</b> \u2014 If there are a lot of patches, it might be worth "
        "painting. But if it\u2019s just a few spots, patch and match. "
        "Don\u2019t spend a fortune on a color the buyer might change anyway.",
        "<b>Flooring</b> \u2014 Badly worn carpet? Get it professionally cleaned first. "
        "You\u2019d be amazed how good it can look again. Only replace it if "
        "cleaning won\u2019t fix it.",
        "<b>Cabinets</b> \u2014 Dated cabinets from the \u201970s? Don\u2019t rip them out. "
        "A fresh coat of paint can make old cabinets look great again.",
        "<b>Appliances and furniture</b> \u2014 They are what they are. "
        "Don\u2019t spend money here.",
    ]
    for item in inside_items:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2022'))

    story.append(Spacer(1, 8))
    story.append(TipBox(
        "<b>Duane\u2019s Rule:</b> Fix what catches the eye. Leave what doesn\u2019t. "
        "Most buyers want to move in and live \u2014 not renovate. "
        "So don\u2019t add a sun room or knock down walls. "
        "Just make the place look clean, fresh, and ready."
    ))

    # WHAT NOT TO DO
    story.append(Paragraph("What NOT to Spend Money On", s['h2']))
    story.append(Paragraph(
        "I\u2019ve seen sellers pour $50,000 into a renovation that nobody noticed. "
        "Here\u2019s the truth: big renos before selling are almost never worth it.",
        s['body']
    ))
    no_list = [
        "Don\u2019t add a sun room or major addition.",
        "Don\u2019t tear out walls to change the layout.",
        "Don\u2019t buy all new appliances.",
        "Don\u2019t refinish all your furniture.",
    ]
    for item in no_list:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2718'))

    story.append(Paragraph(
        "These are things you do for yourself, not for a sale.",
        s['body']
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════
    # CHAPTER 2: MAKING BUYERS FALL IN LOVE
    # ═══════════════════════════════════════
    story.append(Paragraph("Chapter 2", s['label']))
    story.append(Paragraph("Making Buyers Fall in Love", s['h1']))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "This chapter comes straight from my wife Jackie. "
        "She\u2019s been doing decor and staging for over 20 years. "
        "She helped design every custom home we built together. "
        "And she has a gift for making a space feel <i>right</i>.",
        s['body']
    ))
    story.append(Paragraph(
        "Here\u2019s what Jackie says makes buyers fall in love:",
        s['body']
    ))

    # COLOR
    story.append(Paragraph("1. Colors That Flow", s['h3']))
    story.append(Paragraph(
        "When you walk through a home, the colors in every room should feel "
        "like they belong together. They don\u2019t have to match exactly, "
        "but they should all be in the same family. "
        "Warm with warm. Cool with cool. It just has to feel good.",
        s['body']
    ))

    # SCENT
    story.append(Paragraph("2. What You Smell at the Door", s['h3']))
    story.append(Paragraph(
        "This one is huge. The very first thing a buyer notices when they "
        "step inside is the smell. Fresh bread? Candles? That\u2019s a win. "
        "Pet odor? That\u2019s a problem.",
        s['body']
    ))
    story.append(Paragraph(
        "You don\u2019t have to go crazy. A light scented candle or some fresh "
        "flowers make a big difference. And if you have pets, just make sure "
        "the house is extra clean and maybe keep them out during showings.",
        s['body']
    ))

    # LIGHT
    story.append(Paragraph("3. Lighting", s['h3']))
    story.append(Paragraph(
        "Open the blinds. Turn on the lights. Nobody falls in love with a "
        "dark house. You want it bright and open. Buyers want to see the "
        "place \u2014 and you don\u2019t want them feeling like you\u2019re hiding anything.",
        s['body']
    ))
    story.append(Paragraph(
        "The one exception: a cozy den or reading nook. A little softer "
        "light there can actually feel warm and inviting.",
        s['body']
    ))

    # ARTWORK
    story.append(Paragraph("4. Artwork and Photos", s['h3']))
    story.append(Paragraph(
        "Nice artwork on the walls? That\u2019s great. It makes a big impact. "
        "But take down the personal photos. When a buyer sees your family "
        "pictures everywhere, they\u2019re thinking about <i>your</i> life in "
        "that house \u2014 not theirs. You want them to imagine <i>themselves</i> "
        "living there.",
        s['body']
    ))

    # DECLUTTER
    story.append(Paragraph("5. Declutter (Less Is More)", s['h3']))
    story.append(Paragraph(
        "This is the biggest bang for zero bucks. Take stuff out. "
        "If your furniture is too big for the room, it makes everything "
        "feel cramped. Move some pieces out. Pack away the knick-knacks. "
        "You\u2019re moving anyway \u2014 start packing now.",
        s['body']
    ))
    story.append(Paragraph(
        "Jackie always says: <b>\"When you take things away, "
        "the room gets bigger.\"</b> It\u2019s that simple.",
        s['body']
    ))

    story.append(Spacer(1, 8))
    story.append(TipBox(
        "<b>Jackie\u2019s Tip:</b> Walk through your house like you\u2019ve never "
        "been there before. Look at every room with fresh eyes. "
        "What catches your attention? What feels off? "
        "That\u2019s exactly what a buyer will notice too."
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════
    # CHAPTER 3: WHY HOMES DON'T SELL
    # ═══════════════════════════════════════
    story.append(Paragraph("Chapter 3", s['label']))
    story.append(Paragraph("Why Homes Don\u2019t Sell", s['h1']))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "I call these the <b>Three P\u2019s</b>. If your home isn\u2019t selling, "
        "one of these three things is almost always the reason.",
        s['body']
    ))

    # PRICE
    story.append(Paragraph("P #1: Price", s['h2']))
    story.append(Paragraph(
        "This is the big one. I get it \u2014 you raised your family there. "
        "You have a million memories in that house. But here\u2019s the thing: "
        "you\u2019re not selling your memories. You get to keep those. "
        "You\u2019re selling the house.",
        s['body']
    ))
    story.append(Paragraph(
        "The best way to get the price right is to look at <b>sold comparables</b> "
        "\u2014 homes like yours that actually sold in your area recently. "
        "Not what someone is asking. What someone actually paid. "
        "That tells you what the market will give.",
        s['body']
    ))
    story.append(Paragraph(
        "Also check what\u2019s currently listed nearby. You don\u2019t want to be "
        "$40,000 more than the same kind of home down the street. "
        "That just pushes buyers to the other place.",
        s['body']
    ))

    # PRESENTATION
    story.append(Paragraph("P #2: Presentation", s['h2']))
    story.append(Paragraph(
        "Think of your home like a product on a shelf. "
        "When I worked in retail for 11 years, we spent a lot of "
        "time making things look good in the showroom. "
        "Your home is the same.",
        s['body']
    ))
    pres_items = [
        "Show off the best parts. Big kitchen? Make it shine.",
        "Clean, declutter, and fix the little things (see Chapter 1).",
        "Stage it \u2014 even simple staging is proven to get you more money.",
        "Make sure your agent has a plan. Social media, photos, the works.",
        "Keep it clean for every showing. Fresh smell, lights on, pets out.",
    ]
    for item in pres_items:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2022'))

    # PERSON
    story.append(Paragraph("P #3: Person (Your Agent)", s['h2']))
    story.append(Paragraph(
        "Not all agents are the same. You want someone who:",
        s['body']
    ))
    agent_items = [
        "You click with. If you\u2019re on the same page, everything goes smoother.",
        "Has a real marketing plan \u2014 not just \"we\u2019ll put it on MLS and hope.\"",
        "Works hard. I call it <b>perspiration</b>. Are they willing to put "
        "in the work? Show up? Go the extra mile?",
        "Backs up what they say by actually doing it.",
    ]
    for item in agent_items:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2022'))

    story.append(Spacer(1, 8))
    story.append(TipBox(
        "<b>Real talk:</b> If your home has been sitting on the market, "
        "it\u2019s almost always one of these three things. "
        "The good news? All three can be fixed."
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════
    # CHAPTER 4: THE $10,000 SECRET
    # ═══════════════════════════════════════
    story.append(Paragraph("Chapter 4", s['label']))
    story.append(Paragraph("The $10,000 Secret", s['h1']))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Okay, here it is. The secret. And it\u2019s not one big trick. "
        "It\u2019s what happens when you put it all together.",
        s['body']
    ))
    story.append(Paragraph(
        "Every chapter in this guide is a piece of the puzzle:",
        s['body']
    ))

    secret_items = [
        "<b>Fix what catches the eye</b> \u2014 but don\u2019t overspend. "
        "Patch, paint, clean. Focus on what buyers see first.",
        "<b>Make them fall in love</b> \u2014 colors, scent, light, and space. "
        "These cost almost nothing but change everything.",
        "<b>Price it right</b> \u2014 use real sold comparables. "
        "Not what you wish. What the market says.",
        "<b>Present it like a pro</b> \u2014 stage it, clean it, show it off. "
        "Highlight what makes your home special.",
        "<b>Pick the right agent</b> \u2014 someone who knows homes, "
        "has a real plan, and will actually do the work.",
    ]
    for item in secret_items:
        story.append(Paragraph(item, s['bullet'], bulletText='\u2022'))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "When you do all five, something amazing happens. "
        "Buyers don\u2019t just look at your home. They <i>want</i> it. "
        "They compete for it. And that\u2019s where the extra "
        "$10,000 \u2014 sometimes more \u2014 comes from.",
        s['body']
    ))
    story.append(Paragraph(
        "It\u2019s not magic. It\u2019s not a gimmick. It\u2019s just doing the right "
        "things, in the right order, with the right help.",
        s['body']
    ))

    story.append(Spacer(1, 12))
    story.append(HRFlowable(width="60%", color=GOLD, thickness=1,
                            spaceAfter=12, spaceBefore=4, hAlign='CENTER'))

    story.append(Paragraph("Your Checklist", s['h2']))
    story.append(Paragraph(
        "Print this page and check them off one by one:",
        s['body']
    ))

    checklist = [
        "Clean up the yard and curb appeal",
        "Fix holes, dings, and peeling paint",
        "Clean carpets and flooring",
        "Declutter every room \u2014 less is more",
        "Take down personal photos",
        "Light candles, open blinds, turn on lights",
        "Get the smell right (clean, fresh, inviting)",
        "Ask your agent for sold comparables",
        "Price it based on what actually sold",
        "Stage it \u2014 even a simple staging helps",
        "Choose an agent who knows homes and works hard",
    ]
    for item in checklist:
        story.append(Paragraph(
            f"\u2610  {item}",
            ParagraphStyle('checklist', fontName='Helvetica', fontSize=11,
                           leading=20, textColor=INK, leftIndent=12)
        ))

    story.append(PageBreak())

    # ═══════════════════════════════════════
    # CTA PAGE
    # ═══════════════════════════════════════
    story.append(Spacer(1, 1.8 * inch))
    story.append(Paragraph(
        '<font color="#c5a46d">YOUR NEXT STEP</font>',
        ParagraphStyle('cta_label', fontName='Helvetica', fontSize=9,
                       leading=13, textColor=GOLD, alignment=TA_CENTER,
                       spaceAfter=16, letterSpacing=3)
    ))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        '<font color="#ffffff">Ready to Put This<br/>Guide to Work?</font>',
        ParagraphStyle('cta_title', fontName='Helvetica-Bold', fontSize=28,
                       leading=34, textColor=WHITE, alignment=TA_CENTER,
                       spaceAfter=16)
    ))
    story.append(Paragraph(
        '<font color="#8a9ab5">You\u2019ve got the playbook. Now you need the team.<br/><br/>'
        'With Duane, you get someone who has built homes, fixed homes,<br/>'
        'and sold homes \u2014 and who genuinely cares about your outcome.<br/><br/>'
        'With Jackie, you get 20+ years of decorating and staging<br/>'
        'experience that makes buyers say "I want this one."<br/><br/>'
        'And with Coldwell Banker Preferred Real Estate, you get<br/>'
        'one of the top brokerages in North America behind you.</font>',
        ParagraphStyle('cta_desc', fontName='Helvetica', fontSize=11,
                       leading=17, textColor=HexColor("#8a9ab5"),
                       alignment=TA_CENTER, spaceAfter=24)
    ))
    story.append(GoldRule(width=1.2*inch))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        '<font color="#c5a46d">Text Duane: (204) 346-2111</font>',
        ParagraphStyle('cta_phone', fontName='Helvetica-Bold', fontSize=16,
                       leading=22, textColor=GOLD, alignment=TA_CENTER,
                       spaceAfter=6)
    ))
    story.append(Paragraph(
        '<font color="#8a9ab5">Call: (204) 346-2111<br/>'
        'Email: duane@coldwellbanker.ca</font>',
        ParagraphStyle('cta_alt', fontName='Helvetica', fontSize=11,
                       leading=16, textColor=HexColor("#8a9ab5"),
                       alignment=TA_CENTER, spaceAfter=24)
    ))
    story.append(Paragraph(
        '<font color="#5a7090">Serving Landmark \u2022 Linden \u2022 Royalwood \u2022 '
        'Steinbach \u2022 Mitchell<br/>'
        'Niverville \u2022 Kleefeld \u2022 New Bothwell \u2022 '
        'Rural Southern Manitoba</font>',
        ParagraphStyle('cta_areas', fontName='Helvetica', fontSize=9,
                       leading=14, textColor=HexColor("#5a7090"),
                       alignment=TA_CENTER)
    ))

    # ─── Build with page backgrounds ───
    # First pass: count total pages so we know which is last
    from copy import deepcopy
    from io import BytesIO
    story_copy = deepcopy(story)
    buf = BytesIO()
    temp_doc = SimpleDocTemplate(buf, pagesize=letter,
                                 topMargin=72, bottomMargin=72,
                                 leftMargin=72, rightMargin=72)
    temp_doc.build(story_copy)
    last_page = temp_doc.page

    # Second pass: build the real PDF with correct backgrounds
    def on_first_page(canvas, doc):
        cover_page_bg(canvas, doc)

    def on_later_pages(canvas, doc):
        if doc.page == last_page:
            cta_page_bg(canvas, doc)
        else:
            interior_page_bg(canvas, doc)

    doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_pages)

    print(f"\nBooklet created: {output_path}")
    print(f"   Pages: {PageTracker.total}")
    return output_path


if __name__ == "__main__":
    build_booklet()
