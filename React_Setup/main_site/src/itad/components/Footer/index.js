import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from './FooterElements';

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                            <FooterLink to="/itad/home" onClick={toggleHome}>How it works</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Testimonials</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Careers</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Contact Us</FooterLinkTitle>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Contact</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Support</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Destinations</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Sponsorships</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Videos</FooterLinkTitle>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Submit Video</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Ambassadors</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Agency</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Influencer</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Social Media</FooterLinkTitle>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Instagram</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Facebook</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Youtube</FooterLink>
                            <FooterLink to="/itad/home" onClick={toggleHome}>Twitter</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to="/" onClick={toggleHome}>
                            iTAD
                        </SocialLogo>
                        <WebsiteRights>
                            iTAD &copy; {new Date().getFullYear()} All rights reserved.
                        </WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="https://www.facebook.com/" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="https://www.youtube.com/" target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLink>
                            <SocialIconLink href="https://twitter.com/" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
