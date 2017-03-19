<?php

namespace BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Job
 *
 * @ORM\Table(name="Job", uniqueConstraints={@ORM\UniqueConstraint(name="Name_UNIQUE", columns={"Name"})})
 * @ORM\Entity
 */
class Job
{
    /**
     * @var string
     * @ORM\Column(name="Name", type="string", length=50, nullable=false)
     * @ORM\Id
     */

    /**
     * @Assert\NotBlank()
     * @Assert\Length(min=20)
     * @Assert\Length(max=50)
     */

    private $name;


    /**
     * Set name
     *
     * @param string $name
     * @return Job
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }


}
